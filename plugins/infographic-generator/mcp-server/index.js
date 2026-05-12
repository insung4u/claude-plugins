import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import puppeteer from "puppeteer";
import path from "path";

const server = new McpServer({
  name: "puppeteer-renderer",
  version: "1.0.0",
});

server.tool(
  "render_html_to_image",
  "HTML을 PNG 이미지로 변환하여 파일로 저장합니다",
  {
    html: z.string().describe("렌더링할 HTML 전체 내용"),
    output_path: z.string().describe("저장할 PNG 파일 경로 (절대경로 또는 상대경로)"),
    width: z.number().optional().default(1200).describe("뷰포트 너비 (px)"),
    height: z.number().optional().default(1800).describe("뷰포트 높이 (px)"),
  },
  async ({ html, output_path, width, height }) => {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
      });

      const page = await browser.newPage();
      await page.setViewport({ width, height, deviceScaleFactor: 2 });
      await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });

      const resolvedPath = path.resolve(output_path);
      await page.screenshot({
        path: resolvedPath,
        fullPage: true,
        type: "png",
      });

      return {
        content: [{ type: "text", text: `✅ 이미지 저장 완료: ${resolvedPath}` }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `❌ 오류: ${error.message}` }],
        isError: true,
      };
    } finally {
      if (browser) await browser.close();
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
