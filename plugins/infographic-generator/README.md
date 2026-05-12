# infographic-generator

한글 완벽 지원 인포그래픽 생성기. 텍스트를 입력하면 HTML/CSS로 디자인하고 Puppeteer로 PNG 이미지를 생성합니다.

## 요구 사항

### 필수 설치 항목

| 항목 | 설치 방법 |
|------|---------|
| **Node.js 18+** | [nodejs.org/ko](https://nodejs.org/ko) 에서 LTS 버전 다운로드 |
| **브라우저** | 아래 참고 |

> **Node.js를 처음 설치하시나요?**
> nodejs.org에서 "LTS" 버전을 다운로드하여 설치하세요. 설치 후 터미널/명령 프롬프트에서 `node --version`으로 확인할 수 있습니다.

### 브라우저 요구사항

| 플랫폼 | 상태 |
|--------|------|
| Windows | Edge 기본 설치됨 — 추가 설치 불필요 ✅ |
| macOS | [Chrome](https://www.google.com/chrome) 또는 Edge 설치 필요 |
| Linux | `sudo apt install chromium-browser` 또는 Chrome 설치 필요 |

- 지원 플랫폼: Windows, macOS, Linux

## 설치

```shell
/plugin marketplace add insung4u/claude-plugins
```

## 사용법

```
/infographic-generator:infographic
```

스킬 실행 후 Claude가 단계별로 안내합니다:

1. **원문 입력** — 인포그래픽으로 만들 텍스트를 붙여넣습니다
2. **스타일 선택** — 콘텐츠에 맞는 10가지 디자인 스타일 중 선택
3. **방향 선택** — 세로형 또는 가로형 선택
4. **PNG 저장** — Puppeteer가 자동으로 이미지를 렌더링하여 저장

## 출력 형식

| 방향 | 해석도 | 용도 |
|------|--------|------|
| 세로형 | 1200 × 1800 px | SNS, 문서 공유 |
| 가로형 | 1920 × 1080 px | 프레젠테이션, 와이드 화면 |

저장 경로 기본값: `./infographic_output.png`  
시리즈 출력 시: `./infographic_01.png`, `./infographic_02.png` ...

## 스타일 예시

- 미니멀리즘 플랫 디자인
- 다크모드 네온 사이버펑크
- 글래스모피즘 (Glassmorphism)
- 뉴모피즘 (Neumorphism)
- 볼드 타이포그래피 등 10종

## 구조

```
infographic-generator/
├── .claude-plugin/
│   └── plugin.json          # 플러그인 메타데이터
├── mcp-server/
│   ├── index.js             # Puppeteer MCP 서버
│   ├── package.json
│   ├── package-lock.json
│   ├── start.js             # 크로스플랫폼 시작 스크립트 (plugin.json 사용)
│   ├── start.ps1            # Windows PowerShell 스크립트
│   └── start.sh             # macOS / Linux 쉘 스크립트
└── skills/
    └── infographic/
        └── SKILL.md         # /infographic 스킬
```

## 폰트

Noto Sans KR (Korean + Latin, 100~900 전 굵기)이 로컬에 번들되어 있습니다.

- 인터넷 연결 없이도 한글이 완벽하게 렌더링됩니다
- MCP 서버가 시작될 때 자동으로 폰트를 로드하여 캐시합니다
- HTML에 Google Fonts `<link>` 태그를 넣을 필요가 없습니다

## MCP 도구

`puppeteer-renderer` 서버가 제공하는 도구:

| 도구 | 설명 |
|------|------|
| `render_html_to_image` | HTML을 PNG로 변환하여 파일로 저장 |
