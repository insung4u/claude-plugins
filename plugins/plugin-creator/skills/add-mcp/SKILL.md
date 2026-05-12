---
description: 플러그인에 MCP 서버를 추가합니다 (이미지 생성, 브라우저 자동화 등).
---

당신은 Claude Code MCP 서버 개발 전문가입니다.
기존 스킬 전용 플러그인에 MCP 서버를 추가해 드립니다.

## 핵심 규칙

- MCP 서버는 반드시 필요한 경우에만 추가합니다 (스킬로 해결 가능하면 스킬 사용)
- **언어 선택**: Node.js 또는 Python 중 하나를 사용자에게 물어본 후 결정합니다
- Node.js: `command: "node"` 사용 (pwsh, bash 금지 — 크로스플랫폼 호환)
- Python: `command: "uv"` (UV 권장) 또는 `command: "python3"` + `start.py` (pip 방식)
- 브라우저가 필요하면 `puppeteer-core` 사용 (puppeteer 금지 — 170MB 다운로드 방지)

---

## MCP 서버가 필요한 경우

- 이미지/PDF 생성 (Puppeteer, Canvas 등)
- 브라우저 자동화
- 외부 프로그램 실행 (FFmpeg 등)
- Claude 내장 도구로 처리 불가능한 복잡한 파일 변환

## MCP 서버 방식 선택

### A. 로컬 MCP 서버 (이 플러그인에서 직접 구현)
- 플러그인 내에 `mcp-server/` 폴더에 Node.js 서버 구현
- `plugin.json`에 `"command": "node"` 방식 사용
- 완전한 커스텀 구현이 필요할 때

### B. npx 패키지 방식 (npm에 공개된 MCP 서버 사용)
- 이미 npm에 배포된 MCP 서버를 연결
- `plugin.json`에서 `"command": "npx"` 사용:
```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@package/mcp-server"]
    }
  }
}
```
- 예: Context7, Firebase, Playwright 등 공식 MCP 서버
- 항상 최신 버전 자동 사용, 로컬 설치 불필요

> **패키지 검증 필수**: 사용자가 제시한 패키지명이라도 반드시 아래 순서로 확인합니다.
> 1. CLAUDE.md의 "검증된 외부 MCP 서버" 목록에 있는지 먼저 확인
> 2. 목록에 없으면 npmjs.com에서 패키지 실재 여부와 다운로드 수 확인 (WebFetch 사용)
> 3. 타이포스쿼팅 의심 패키지(잘 알려진 이름과 철자가 유사한 경우)는 사용자에게 경고
> 4. 확인되지 않은 패키지는 plugin.json에 기록하기 전에 사용자의 명시적 동의를 받음

> 사용 사례를 분석해서 적합한 방식을 추천합니다.

---

## 진행 단계

### 1단계: 요구사항 파악 + 언어 선택

정보가 없으면 물어봅니다:

> "어떤 기능을 위해 MCP 서버가 필요한가요?
>
> 예시:
> - HTML을 이미지로 변환
> - 웹 페이지 캡처
> - PDF 생성
> - AI/ML 라이브러리 연동"

이어서 **언어를 반드시 물어봅니다**:

> "MCP 서버를 어떤 언어로 만들까요?
>
> - **Node.js** — 브라우저 자동화, 이미지 생성, npm 생태계 활용
> - **Python** — AI/ML 라이브러리, 데이터 처리, Python 생태계 활용"

Python을 선택했다면 패키지 관리자도 물어봅니다:

> "Python 패키지 관리자는 무엇을 사용할까요?
>
> - **UV** (권장) — 자동 venv+설치, 크로스플랫폼, 빠름
> - **pip** — 전통적 방식, start.py로 자동 설치"

대상 플러그인의 현재 구조를 파악합니다.

### 2단계: 설계

필요한 MCP 도구(tool)를 결정합니다:
- 도구 이름
- 입력 파라미터
- 출력 형식
- 필요한 패키지 (Node.js: npm / Python: pip)

설계안 확인:

```
📋 MCP 서버 설계안

플러그인: <plugin-name>
언어: Node.js | Python (UV) | Python (pip)
서버 이름: <server-name>
도구: <tool-name> — <기능>
패키지: <packages>

이대로 진행할까요?
```

### 3단계: 파일 생성

선택된 언어에 따라 해당 섹션의 파일을 생성합니다.

---

#### [Node.js] `mcp-server/package.json`
```json
{
  "name": "<plugin-name>-mcp",
  "version": "1.0.0",
  "type": "module",
  "description": "MCP server for <plugin-name>",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.0.0"
  }
}
```

#### [Node.js] `mcp-server/start.js` (모든 플랫폼 공통)
```javascript
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
    process.stderr.write("오류: Node.js 18+ 가 설치되어 있는지 확인해 주세요.\n");
    process.exit(1);
  }
}

await import("./index.js");
```

#### [Node.js] `mcp-server/start.ps1` (Windows PowerShell 참고용)
```powershell
Set-Location $PSScriptRoot
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies (first run)..."
    npm install --silent
}
node "$PSScriptRoot/index.js"
```

#### [Node.js] `mcp-server/start.sh` (macOS/Linux 참고용)
```bash
#!/bin/bash
cd "$(dirname "$0")"
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies (first run)..."
  npm install --silent
fi
node "$(dirname "$0")/index.js"
```

#### [Node.js] `mcp-server/.gitignore`
```
node_modules/
.cache/
```

#### [Node.js] `mcp-server/index.js`

브라우저가 필요한 경우 (`puppeteer-core` 사용):
```javascript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import puppeteer from "puppeteer-core";
import path from "path";
import { existsSync } from "fs";

function findBrowser() {
  const candidates = {
    win32: [
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    ],
    darwin: [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    ],
    linux: [
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
    ],
  };
  for (const p of candidates[process.platform] ?? []) {
    if (existsSync(p)) return p;
  }
  throw new Error(
    "Chrome 또는 Edge를 설치해 주세요.\nhttps://www.google.com/chrome"
  );
}

const server = new McpServer({ name: "<server-name>", version: "1.0.0" });

server.tool(
  "<tool-name>",
  "<도구 설명>",
  {
    // zod 스키마
  },
  async (args) => {
    let browser;
    try {
      browser = await puppeteer.launch({
        executablePath: findBrowser(),
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      // 구현
      return { content: [{ type: "text", text: "완료" }] };
    } catch (error) {
      return { content: [{ type: "text", text: `❌ 오류: ${error.message}` }], isError: true };
    } finally {
      if (browser) await browser.close();
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

#### [Node.js] `.claude-plugin/plugin.json` 업데이트
```json
{
  "name": "<plugin-name>",
  "version": "1.0.0",
  "description": "<설명>",
  "mcpServers": {
    "<server-name>": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/mcp-server/start.js"]
    }
  }
}
```

---

#### [Python/UV] `mcp-server/pyproject.toml`
```toml
[project]
name = "<plugin-name>-mcp"
version = "1.0.0"
requires-python = ">=3.10"
description = "MCP server for <plugin-name>"
dependencies = [
    "mcp[cli]>=1.0.0",
    "pydantic>=2.0.0",
]
```

#### [Python/UV & pip] `mcp-server/server.py`
```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("<plugin-name>-server")

@mcp.tool()
def <tool_name>(<param>: str) -> str:
    """<도구 설명>"""
    try:
        # 구현
        return "결과"
    except Exception as e:
        return f"❌ 오류: {e}"

if __name__ == "__main__":
    mcp.run()
```

#### [Python/pip] `mcp-server/requirements.txt`
```
mcp[cli]>=1.0.0
pydantic>=2.0.0
```

#### [Python/pip] `mcp-server/start.py` (크로스플랫폼 진입점)
```python
import os
import sys
import subprocess
from pathlib import Path

script_dir = Path(__file__).parent
venv_dir = script_dir / ".venv"

if not venv_dir.exists():
    sys.stderr.write("첫 실행 설정 중... (수 초 소요)\n")
    try:
        subprocess.run([sys.executable, "-m", "venv", str(venv_dir)], check=True)
        pip = venv_dir / ("Scripts/pip.exe" if sys.platform == "win32" else "bin/pip")
        subprocess.run(
            [str(pip), "install", "-r", str(script_dir / "requirements.txt")],
            check=True, capture_output=True
        )
    except Exception as e:
        sys.stderr.write(f"오류: Python 3.10+ 가 설치되어 있는지 확인해 주세요. ({e})\n")
        sys.exit(1)

python = venv_dir / ("Scripts/python.exe" if sys.platform == "win32" else "bin/python")
os.execv(str(python), [str(python), str(script_dir / "server.py")])
```

#### [Python] `mcp-server/.gitignore`
```
.venv/
__pycache__/
*.pyc
.cache/
```

#### [Python/UV] `.claude-plugin/plugin.json` 업데이트
```json
{
  "name": "<plugin-name>",
  "version": "1.0.0",
  "description": "<설명>",
  "mcpServers": {
    "<server-name>": {
      "command": "uv",
      "args": ["run", "${CLAUDE_PLUGIN_ROOT}/mcp-server/server.py"]
    }
  }
}
```

#### [Python/pip] `.claude-plugin/plugin.json` 업데이트
```json
{
  "name": "<plugin-name>",
  "version": "1.0.0",
  "description": "<설명>",
  "mcpServers": {
    "<server-name>": {
      "command": "python3",
      "args": ["${CLAUDE_PLUGIN_ROOT}/mcp-server/start.py"]
    }
  }
}
```

### 4단계: 의존성 설치

**Node.js:** `mcp-server/` 디렉토리에서 `npm install`을 실행하여 `package-lock.json`을 생성합니다.
(직접 실행 불가 시 사용자에게 안내)

**Python/UV:** 별도 설치 불필요. `uv run server.py` 첫 실행 시 자동 처리됩니다.
`pyproject.toml`이 커밋에 포함되어 있는지 확인합니다.

**Python/pip:** `start.py`가 첫 실행 시 자동으로 `.venv/`를 만들고 설치합니다.
`requirements.txt`, `start.py`가 커밋에 포함되어 있는지 확인합니다.

### 5단계: 완료 안내

**Node.js:**
```
✅ MCP 서버(Node.js)가 추가되었습니다!

📁 생성된 파일:
- plugins/<plugin-name>/mcp-server/index.js
- plugins/<plugin-name>/mcp-server/package.json
- plugins/<plugin-name>/mcp-server/start.js
- plugins/<plugin-name>/mcp-server/start.ps1
- plugins/<plugin-name>/mcp-server/start.sh
- plugins/<plugin-name>/mcp-server/.gitignore
- plugins/<plugin-name>/.claude-plugin/plugin.json (업데이트)

⚠️ 사용자 요구사항 (README에 반드시 명시):
- Node.js 18+ 설치 필요: https://nodejs.org/ko (LTS 버전)
- 브라우저가 필요한 경우:
  - Windows: Edge 기본 설치됨 (추가 설치 불필요)
  - macOS: Chrome 또는 Edge 설치 필요
  - Linux: chromium 또는 google-chrome 설치 필요
```

**Python/UV:**
```
✅ MCP 서버(Python/UV)가 추가되었습니다!

📁 생성된 파일:
- plugins/<plugin-name>/mcp-server/server.py
- plugins/<plugin-name>/mcp-server/pyproject.toml
- plugins/<plugin-name>/mcp-server/.gitignore
- plugins/<plugin-name>/.claude-plugin/plugin.json (업데이트)

⚠️ 사용자 요구사항 (README에 반드시 명시):
- UV 설치 필요:
  - Windows: powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
  - macOS/Linux: curl -LsSf https://astral.sh/uv/install.sh | sh
- Python 3.10+는 UV가 자동으로 관리 (별도 설치 불필요)
```

**Python/pip:**
```
✅ MCP 서버(Python/pip)가 추가되었습니다!

📁 생성된 파일:
- plugins/<plugin-name>/mcp-server/server.py
- plugins/<plugin-name>/mcp-server/requirements.txt
- plugins/<plugin-name>/mcp-server/start.py
- plugins/<plugin-name>/mcp-server/.gitignore
- plugins/<plugin-name>/.claude-plugin/plugin.json (업데이트)

⚠️ 사용자 요구사항 (README에 반드시 명시):
- Python 3.10+ 설치 필요: https://www.python.org/downloads
- Windows 설치 시 "Add Python to PATH" 옵션 체크 필수
- 첫 실행 시 start.py가 자동으로 .venv/ 생성 및 패키지 설치
```
