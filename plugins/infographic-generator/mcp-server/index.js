import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import puppeteer from "puppeteer-core";
import path from "path";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function findBrowser() {
  const platform = process.platform;

  const candidates = {
    win32: [
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    ],
    darwin: [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ],
    linux: [
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
      "/snap/bin/chromium",
    ],
  };

  for (const p of candidates[platform] ?? []) {
    if (existsSync(p)) return p;
  }

  throw new Error(
    "Chrome 또는 Edge 브라우저를 찾을 수 없습니다.\n" +
    "https://www.google.com/chrome 에서 Chrome을 설치한 후 다시 시도해 주세요."
  );
}

function buildLocalFontCSS() {
  const pkgDir = resolve(__dirname, "node_modules/@fontsource/noto-sans-kr");
  if (!existsSync(pkgDir)) return "";

  // Korean + Latin subsets, all weights
  const subsets = ["korean", "latin"];
  const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  let css = "";

  for (const subset of subsets) {
    for (const weight of weights) {
      const woff2Path = resolve(pkgDir, "files", `noto-sans-kr-${subset}-${weight}-normal.woff2`);
      if (!existsSync(woff2Path)) continue;

      const b64 = readFileSync(woff2Path).toString("base64");
      css += `@font-face{font-family:'Noto Sans KR';font-style:normal;font-display:swap;font-weight:${weight};src:url('data:font/woff2;base64,${b64}') format('woff2');}\n`;
    }
  }

  return css;
}

// Build font CSS once at startup and cache it
const FONT_CSS = buildLocalFontCSS();

const server = new McpServer({
  name: "puppeteer-renderer",
  version: "1.0.0",
});

server.tool(
  "render_html_to_image",
  "HTML을 PNG 이미지로 변환하여 파일로 저장합니다",
  {
    html: z.string().describe("렌더링할 HTML 전체 내용"),
    output_path: z.string().endsWith(".png").describe("저장할 PNG 파일 경로 (절대경로 또는 상대경로, 반드시 .png로 끝나야 함)"),
    width: z.number().optional().default(1200).describe("뷰포트 너비 (px)"),
    height: z.number().optional().default(1800).describe("뷰포트 높이 (px)"),
  },
  async ({ html, output_path, width, height }) => {
    let browser;
    try {
      browser = await puppeteer.launch({
        executablePath: findBrowser(),
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
      });

      const page = await browser.newPage();
      await page.setViewport({ width, height, deviceScaleFactor: 2 });

      // Block Google Fonts CDN — local fonts are used instead
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const url = req.url();
        if (url.includes("fonts.googleapis.com") || url.includes("fonts.gstatic.com")) {
          req.abort();
        } else {
          req.continue();
        }
      });

      // Strip Google Fonts link tags and inject local fonts at the top of <head>
      const processedHtml = html
        .replace(/<link[^>]*(googleapis|gstatic)[^>]*>/gi, "")
        .replace(/<head>/i, `<head><style>${FONT_CSS}</style>`);

      await page.setContent(processedHtml, { waitUntil: "networkidle0", timeout: 30000 });

      const resolvedPath = path.resolve(output_path);
      // Security: restrict output path to cwd and safe home subdirectories only.
      // Uses path.sep suffix to prevent prefix-collision attacks
      // (e.g. "/home/user/projects-evil" matching "/home/user/projects").
      const cwd = process.cwd();
      const home = process.env.HOME ?? process.env.USERPROFILE ?? "";
      const safeHomeDirs = ["Desktop", "Documents", "Downloads", "Pictures"];
      const allowed = [
        cwd,
        ...safeHomeDirs.map((d) => path.resolve(home, d)),
      ].filter(Boolean);
      const isAllowed = allowed.some((base) => {
        const normalizedBase = path.resolve(base);
        return (
          resolvedPath === normalizedBase ||
          resolvedPath.startsWith(normalizedBase + path.sep)
        );
      });
      if (!isAllowed) {
        const fileName = path.basename(resolvedPath);
        return {
          content: [{ type: "text", text: `❌ 보안 오류: 저장 경로가 허용된 범위를 벗어났습니다.\n허용 위치: 현재 작업 디렉토리, Desktop, Documents, Downloads, Pictures\n요청한 파일명: ${fileName}` }],
          isError: true,
        };
      }

      // PNG 출력 디렉토리 생성 (없으면 자동 생성)
      mkdirSync(path.dirname(resolvedPath), { recursive: true });

      await page.screenshot({
        path: resolvedPath,
        fullPage: true,
        type: "png",
      });

      // HTML 파일도 함께 저장 (.png → .html)
      const htmlPath = resolvedPath.replace(/\.png$/i, ".html");
      writeFileSync(htmlPath, processedHtml, "utf-8");

      return {
        content: [{ type: "text", text: `✅ 저장 완료\n  📄 HTML: ${htmlPath}\n  🖼️  PNG:  ${resolvedPath}` }],
      };
    } catch (error) {
      // Strip absolute paths from system error messages to avoid leaking internal paths
      const safeMessage = error.message.replace(/([A-Za-z]:[\\/]|\/)[^\s'"]*/g, "<경로 숨김>");
      return {
        content: [{ type: "text", text: `❌ 오류: ${safeMessage}` }],
        isError: true,
      };
    } finally {
      if (browser) await browser.close();
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
