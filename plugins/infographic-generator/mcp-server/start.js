import { execSync } from "child_process";
import { existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!existsSync(resolve(__dirname, "node_modules"))) {
  process.stderr.write("첫 실행 설정 중... (수 초 소요)\n");
  try {
    execSync("npm install", { cwd: __dirname, stdio: ["ignore", "ignore", "inherit"] });
  } catch {
    process.stderr.write("오류: 설치에 실패했습니다. Node.js 18 이상이 설치되어 있는지 확인해 주세요.\n");
    process.exit(1);
  }
}

await import("./index.js");
