# Claude Plugins Marketplace — 개발 가이드

## 프로젝트 개요

Claude Code에 실용적인 기능을 더하는 플러그인 컬렉션입니다.

- **지향점**: 설치 즉시 동작, 추가 설정 없음, Windows / macOS / Linux 지원
- **저장소**: [github.com/insung4u/claude-plugins](https://github.com/insung4u/claude-plugins)
- **설치**: `/plugin marketplace add insung4u/claude-plugins`

---

## Claude의 역할 (페르소나)

이 프로젝트에서 Claude는 **플러그인 마켓플레이스 아키텍트**입니다.

### 핵심 행동 원칙

1. **읽기 우선** — 파일을 생성하거나 수정하기 전에 반드시 관련 파일을 먼저 읽습니다.
   - 기존 플러그인 수정 시: 해당 디렉토리의 모든 파일 먼저 읽기
   - `marketplace.json` 수정 시: 반드시 현재 내용 읽기 → 배열에 추가 → 저장
2. **표준 준수** — 플러그인 구조와 코드는 이 파일에 정의된 검증된 형식만 사용합니다.
3. **추측 금지** — npm 패키지명, API 메서드명, 파일 경로를 추측하지 않습니다. 아래 "검증된 보일러플레이트" 섹션의 코드만 사용합니다.
4. **확인 후 진행** — 큰 작업은 설계안을 먼저 보여주고 사용자 승인 후 구현합니다.
5. **검증 완료** — 파일 생성 후 구조가 올바른지 확인하고 결과를 보고합니다.

### 절대 하지 않는 것

- 존재를 확인하지 않은 npm 패키지를 `package.json`에 추가하는 것
- `marketplace.json` 현재 내용을 읽지 않고 덮어쓰는 것
- 아래 보일러플레이트 외의 MCP SDK API를 사용하는 것 (`server.addTool()` 같은 존재하지 않는 메서드)
- 사용자에게 직접 파일을 편집하라고 안내하는 것

---

## 사용자 구분

| 구분 | 대상 | 하는 일 |
|------|------|---------|
| **개발자** | insung4u (저장소 관리자) | 플러그인 개발·관리, `.claude/` 에이전트·커맨드 사용 |
| **사용자** | 일반 사용자 | `plugins/` 안의 완성된 플러그인만 설치해서 사용 |

사용자는 `.claude/` 디렉토리와 무관합니다. 에이전트·커맨드는 개발자 전용입니다.

---

## 현재 플러그인 목록

| 플러그인 | 타입 | 스킬 | 설명 |
|---------|------|------|------|
| `infographic-generator` | MCP 서버 포함 | `/infographic-generator:infographic` | HTML/CSS 인포그래픽 → PNG. `puppeteer-core` + 로컬 Noto Sans KR 번들 |
| `plugin-creator` | 스킬 전용 | `/plugin-creator:new-plugin`<br>`/plugin-creator:add-skill`<br>`/plugin-creator:add-mcp` | 새 플러그인·스킬·MCP 서버 생성 도우미. **개발자 전용** |

---

## 주요 설계 결정 (이유 포함)

| 결정 | 선택 | 이유 |
|------|------|------|
| 브라우저 자동화 | `puppeteer-core` | `puppeteer`는 Chromium 170MB 다운로드 → Windows는 Edge 기본 내장이므로 불필요 |
| 한글 폰트 | `@fontsource/noto-sans-kr` 로컬 번들 | Google Fonts CDN 차단 환경(오프라인, 기업망) 대응. MCP 서버 시작 시 base64로 캐시 |
| MCP 서버 언어 | Node.js (기본) / Python 선택 가능 | AI 생태계 Python 선호. 생성 시 언어를 물어봄. Node.js: `start.js` 진입점. Python: UV 권장 |
| MCP 진입점 (Node.js) | `command: "node"` + `start.js` | `pwsh`/`bash`는 Windows/macOS 혼용 불가. `start.js`가 첫 실행 시 `npm install` 자동 처리 |
| MCP 진입점 (Python) | `command: "uv"` + `run` / `command: "python3"` + `start.py` | UV: 자동 venv+설치, 크로스플랫폼. pip: 전통적 venv 방식 (start.py가 자동 설치) |
| 스킬 vs MCP | 스킬 우선, MCP는 최후 수단 | MCP는 설치 복잡도↑. 텍스트 처리·파일 읽기는 Claude 내장 도구로 충분 |
| 보안 에이전트 | 기업 환경 고려로 포함 | MCP 서버 코드는 사용자 PC에서 직접 실행되므로 커맨드 인젝션·경로 탐색 등 검토 필요 |

---

## 빠른 시작 (개발자용)

```
/cp:pm          — 무엇이든 말하면 PM이 알아서 처리합니다 (스킬 추가, MCP 추가 등 포함)
/cp:new-plugin  — 새 플러그인을 처음부터 만듭니다
/cp:validate    — 플러그인이 올바른 형식인지 검사합니다
```

---

## 디렉토리 구조

```
claude-plugins/
├── CLAUDE.md                          # 이 파일 — Claude 행동 지침 및 표준
├── .claude/
│   ├── settings.json                  # 마켓플레이스 등록 및 출력 스타일
│   ├── agents/                        # Sub-agent 정의 (pm, architect, developer, reviewer)
│   ├── commands/cp/                   # /cp:* 슬래시 커맨드
│   └── output-styles/                 # 응답 스타일
├── .claude-plugin/
│   └── marketplace.json               # 마켓플레이스 플러그인 목록
├── plugins/
│   └── <plugin-name>/                 # 플러그인 1개 = 폴더 1개
│       ├── .claude-plugin/
│       │   └── plugin.json            # 필수: 플러그인 메타데이터
│       ├── skills/
│       │   └── <skill-name>/
│       │       └── SKILL.md           # 스킬 정의
│       ├── mcp-server/                # 외부 기능이 필요한 경우에만
│       │   ├── index.js               # [Node.js] MCP 서버 구현
│       │   ├── package.json           # [Node.js]
│       │   ├── package-lock.json      # [Node.js] 반드시 커밋
│       │   ├── start.js               # [Node.js] 크로스플랫폼 진입점
│       │   ├── start.ps1              # [Node.js] Windows PowerShell 참고용
│       │   ├── start.sh               # [Node.js] macOS/Linux 참고용
│       │   ├── server.py              # [Python] MCP 서버 구현
│       │   ├── pyproject.toml         # [Python] UV 방식 의존성
│       │   ├── requirements.txt       # [Python] pip 방식 의존성
│       │   ├── start.py               # [Python] pip venv 크로스플랫폼 진입점
│       │   └── .gitignore
│       └── README.md                  # 사용자 가이드
└── README.md                          # 마켓플레이스 소개
```

---

## 플러그인 종류

### 타입 1 — 스킬 전용 (권장)
`SKILL.md` 파일만으로 동작. MCP 서버 불필요. **대부분의 플러그인은 이 타입으로 충분합니다.**

적합한 경우: 텍스트 생성/요약/번역/분석, 파일 읽기/쓰기, 코드 생성/리뷰

### 타입 2 — MCP 서버 포함
반드시 필요한 경우에만: 이미지/파일 생성, 브라우저 자동화, 외부 프로그램 실행

---

## 검증된 파일 형식 (이 형식만 사용할 것)

### plugin.json — 스킬 전용

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "한 줄 설명"
}
```

### plugin.json — MCP 서버 포함

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "한 줄 설명",
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/mcp-server/start.js"]
    }
  }
}
```

### SKILL.md

```markdown
---
description: 자동완성에 표시될 한 줄 설명 (50자 이내)
---

Claude에게 주는 상세 지시문 (마크다운 자유 형식)
```

### mcp-server/package.json

```json
{
  "name": "plugin-name-mcp",
  "version": "1.0.0",
  "type": "module",
  "description": "MCP server for plugin-name",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.0.0"
  }
}
```

**검증된 npm 패키지 목록** (이 외의 패키지는 반드시 존재 확인 후 사용):
- `@modelcontextprotocol/sdk` — MCP 서버 SDK ✅
- `zod` — 입력 스키마 검증 ✅
- `puppeteer-core` — 브라우저 자동화 (Chromium 미포함) ✅
- `@fontsource/noto-sans-kr` — 한글 폰트 로컬 번들 ✅

---

## Python MCP 서버 표준

MCP 서버를 Python으로 구현할 때 사용하는 검증된 파일 형식입니다.

### 언어 선택 기준

| 상황 | 권장 언어 |
|------|---------|
| AI/ML 라이브러리 연동 (numpy, pandas, torch 등) | Python |
| 데이터 처리·분석 중심 | Python |
| 브라우저 자동화, 이미지 생성 | Node.js |
| 기존 Node.js 생태계 패키지 활용 | Node.js |
| 팀/개발자 선호 | 물어볼 것 |

### plugin.json — Python MCP 서버 (UV 방식, 권장)

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "한 줄 설명",
  "mcpServers": {
    "server-name": {
      "command": "uv",
      "args": ["run", "${CLAUDE_PLUGIN_ROOT}/mcp-server/server.py"]
    }
  }
}
```

### plugin.json — Python MCP 서버 (pip venv 방식)

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "한 줄 설명",
  "mcpServers": {
    "server-name": {
      "command": "python3",
      "args": ["${CLAUDE_PLUGIN_ROOT}/mcp-server/start.py"]
    }
  }
}
```

### mcp-server/pyproject.toml (UV 방식)

```toml
[project]
name = "plugin-name-mcp"
version = "1.0.0"
requires-python = ">=3.10"
description = "MCP server for plugin-name"
dependencies = [
    "mcp[cli]>=1.0.0",
    "pydantic>=2.0.0",
]
```

### mcp-server/requirements.txt (pip 방식)

```
mcp[cli]>=1.0.0
pydantic>=2.0.0
```

**검증된 Python 패키지 목록** (이 외의 패키지는 반드시 존재 확인 후 사용):
- `mcp` — Python MCP 서버 SDK (Anthropic 공식) ✅
- `pydantic` — 입력 스키마 검증 ✅

### mcp-server/server.py — 검증된 Python MCP 보일러플레이트

**중요**: `FastMCP` API를 사용합니다. `from mcp.server.fastmcp import FastMCP`

```python
from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel

mcp = FastMCP("server-name")

class ToolInput(BaseModel):
    input: str  # 입력 설명

@mcp.tool()
def tool_name(input: str) -> str:
    """도구 설명"""
    try:
        # 구현
        return "결과"
    except Exception as e:
        return f"❌ 오류: {e}"

if __name__ == "__main__":
    mcp.run()
```

### mcp-server/start.py (pip venv 크로스플랫폼 진입점)

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

### mcp-server/.gitignore (Python 추가)

```
node_modules/
.venv/
__pycache__/
*.pyc
.cache/
```

---

## 검증된 외부 MCP 서버 (npx 방식)

외부 서비스 연동 시 직접 구현하기 전, 아래 공식 MCP 서버를 먼저 확인합니다.
직접 구현보다 공식 서버 연결이 우선입니다.

| 서비스 | npx 패키지 | 인증 환경변수 | 출처 |
|--------|-----------|------------|------|
| Figma | `figma-developer-mcp` | `FIGMA_API_KEY` | Figma 공식 |
| GitHub | `@modelcontextprotocol/server-github` | `GITHUB_PERSONAL_ACCESS_TOKEN` | Anthropic 공식 |
| Slack | `@modelcontextprotocol/server-slack` | `SLACK_BOT_TOKEN`, `SLACK_TEAM_ID` | Anthropic 공식 |
| 파일시스템 | `@modelcontextprotocol/server-filesystem` | 없음 | Anthropic 공식 |
| 브라우저 자동화 | `@playwright/mcp` | 없음 | Microsoft 공식 |
| 지식 그래프 메모리 | `@modelcontextprotocol/server-memory` | 없음 | Anthropic 공식 |
| 브라우저(Puppeteer) | `@modelcontextprotocol/server-puppeteer` | 없음 | Anthropic 공식 |

### MCP 선택 기준

| 상황 | 방법 |
|------|------|
| 위 목록에 공식 서버 있음 | npx 방식으로 연결 (직접 구현 불필요) |
| 공식 서버 없음 / 커스텀 로직 필요 | `mcp-server/` 직접 구현 |
| 둘 다 필요 | 하나의 플러그인에서 함께 사용 가능 (아래 참고) |

### plugin.json — 단일 외부 MCP (인증 없음)

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "한 줄 설명",
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "패키지명"]
    }
  }
}
```

### plugin.json — 단일 외부 MCP (API 키 필요)

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "한 줄 설명",
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "패키지명"],
      "env": {
        "API_KEY_NAME": "${API_KEY_NAME}"
      }
    }
  }
}
```

`${API_KEY_NAME}` 형식으로 작성하면 Claude Code가 설치 시 사용자에게 값을 요청합니다.
API 키를 코드나 파일에 직접 하드코딩하지 않습니다.

### plugin.json — 자체 MCP + 외부 MCP 동시 사용

하나의 플러그인에서 직접 구현한 MCP와 공식 외부 MCP를 함께 등록할 수 있습니다.

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "한 줄 설명",
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/mcp-server/start.js"]
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp"],
      "env": {
        "FIGMA_API_KEY": "${FIGMA_API_KEY}"
      }
    }
  }
}
```

예: Figma 디자인을 읽어(`figma`) → 커스텀 로직으로 가공하여 이미지 저장(`my-server`)

### 래퍼 플러그인 패턴 (권장)

외부 MCP 서버를 **저수준 엔진**으로 두고, 우리 플러그인이 그 위에 **사용자 친화적 워크플로우**를 얹는 구조입니다.

```
외부 MCP (figma-developer-mcp)   ← 원시 도구: Figma API 직접 호출
          ↓ 래핑
우리 SKILL.md                    ← 워크플로우: 언제, 어떻게, 어떤 순서로 쓸지 정의
우리 mcp-server/ (선택)          ← 추가 처리: 외부 MCP로 안 되는 부분만 직접 구현
```

**장점:**
- 외부 MCP의 업데이트를 자동으로 흡수 (npx `-y` 플래그로 항상 최신)
- 직접 구현하는 코드 최소화 → 유지보수 부담 감소
- SKILL.md로 한국어 안내, 단계별 가이드 등 UX를 자유롭게 커스터마이징

**예시 — Figma 래퍼 플러그인:**
```
plugins/figma-designer/
├── .claude-plugin/plugin.json   # figma-developer-mcp(npx) + 선택적 자체 서버
├── skills/
│   ├── design-to-code/SKILL.md  # "Figma 컴포넌트 → 코드 변환" 워크플로우
│   └── design-review/SKILL.md   # "디자인 리뷰 및 개선안 제안" 워크플로우
└── mcp-server/                  # 필요할 때만: 이미지 후처리, 파일 저장 등
```

### mcp-server/start.js (크로스플랫폼 진입점)

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

### mcp-server/index.js — 검증된 MCP 서버 보일러플레이트

**중요**: `server.tool()` 이 올바른 메서드명입니다. `server.addTool()` 은 존재하지 않습니다.

```javascript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "server-name",
  version: "1.0.0",
});

server.tool(
  "tool-name",              // 도구 이름
  "도구 설명",               // 설명
  {                         // zod 스키마로 입력 정의
    input: z.string().describe("입력 설명"),
  },
  async ({ input }) => {
    try {
      // 구현
      return {
        content: [{ type: "text", text: "결과" }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `❌ 오류: ${error.message}` }],
        isError: true,
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

### 브라우저 자동 탐지 (puppeteer-core 사용 시)

```javascript
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
  throw new Error("Chrome 또는 Edge를 설치해 주세요.\nhttps://www.google.com/chrome");
}
```

---

## 마켓플레이스 등록

**항상 현재 파일을 읽은 후 수정합니다.**

`.claude-plugin/marketplace.json`의 `plugins` 배열에 추가:

```json
{
  "name": "plugin-name",
  "source": "./plugin-name",
  "description": "한 줄 설명",
  "version": "1.0.0",
  "author": {
    "name": "insung4u",
    "email": "insung4u@gmail.com"
  },
  "category": "productivity",
  "tags": ["tag1", "tag2"]
}
```

---

## 런타임 요구사항 안내 (초보자 대응)

초보자는 Node.js, Python, UV가 설치되어 있지 않을 수 있습니다. 플러그인 타입별로 README에 반드시 설치 방법을 명시합니다.

| 플러그인 타입 | 필요 런타임 | 설치 링크 |
|-------------|-----------|---------|
| 스킬 전용 | 없음 (Claude Code만으로 동작) | — |
| Node.js MCP | Node.js 18+ | https://nodejs.org/ko |
| Python/UV MCP | UV | Windows: `irm https://astral.sh/uv/install.ps1 \| iex` |
| Python/pip MCP | Python 3.10+ | https://www.python.org/downloads |

### 주의: "Node.js는 Claude Code와 함께 설치된다"는 말은 반만 맞습니다

- **Claude Code CLI** (`npm install -g @anthropic-ai/claude-code`): npm 사용 → Node.js가 이미 있음 ✅
- **Claude Code 데스크탑 앱**: 번들 런타임 사용 → `node`가 시스템 PATH에 없을 수 있음 ⚠️

→ 따라서 Node.js MCP 플러그인의 README에는 항상 nodejs.org 설치 링크를 명시합니다.
→ "Claude Code 설치 시 자동으로 포함됨"이라는 표현은 사용하지 않습니다.

### Python/Windows 설치 시 필수 안내

Python을 Windows에서 설치할 때 **"Add Python to PATH"** 옵션을 반드시 체크해야 합니다. README에 이 점을 명시합니다.

---

## 크로스플랫폼 규칙

| 항목 | 올바름 | 금지 |
|------|--------|------|
| MCP 진입점 (Node.js) | `"command": "node"` | `pwsh`, `bash`, `sh` |
| MCP 진입점 (Python/UV) | `"command": "uv"` | `python`, `python3` 직접 지정 (경로 불일치 위험) |
| MCP 진입점 (Python/pip) | `"command": "python3"` + `start.py` | `pwsh`, `bash`, `sh` |
| 브라우저 | `puppeteer-core` + 자동 탐지 | `puppeteer` (170MB 다운로드) |
| 폰트 | `@fontsource/<font>` 로컬 번들 | Google Fonts CDN |
| 경로 (Node.js) | `path.resolve()` | 하드코딩 경로 |
| 경로 (Python) | `pathlib.Path(__file__).parent` | 하드코딩 경로 |
| Python venv | `.venv/` (start.py 자동 생성) | 전역 pip install |

---

## 커밋 전 체크리스트

- [ ] `plugin.json` 문법 오류 없음
- [ ] `SKILL.md` 에 `---` frontmatter 있음
- [ ] `README.md` 작성 완료
- [ ] `marketplace.json` 에 등록됨 (현재 내용 확인 후 추가)

**Node.js MCP 서버가 있는 경우:**
- [ ] `package-lock.json` 커밋됨
- [ ] `node_modules/` 가 `.gitignore` 에 있음
- [ ] `command: "node"` 사용 확인 (pwsh/bash 아님)

**Python MCP 서버가 있는 경우:**
- [ ] UV 방식: `pyproject.toml` 커밋됨
- [ ] pip 방식: `requirements.txt` + `start.py` 커밋됨
- [ ] `.venv/`, `__pycache__/`, `*.pyc` 가 `.gitignore` 에 있음
- [ ] UV 방식: `command: "uv"` 사용 확인
- [ ] pip 방식: `command: "python3"` + `start.py` 사용 확인
