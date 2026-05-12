# claude-plugins

Claude Code에 실용적인 기능을 더하는 플러그인 컬렉션.
[@insung4u](https://github.com/insung4u) 가 만들고 관리합니다.

> **Claude Code 플러그인**이란?
> `/plugin install <name>` 한 줄로 설치하면 `/<plugin>:<skill>` 형태의 새 기능이 Claude Code에 추가됩니다.
> Windows, macOS, Linux 모두 지원합니다.

## 마켓플레이스 등록

```shell
/plugin marketplace add insung4u/claude-plugins
```

## 플러그인 목록

### 일반 사용자용

| 플러그인 | 설명 | 설치 |
|---------|------|------|
| [`infographic-generator`](./plugins/infographic-generator/) | 한글 완벽 지원 인포그래픽 생성기 (HTML/CSS → PNG) | `/plugin install infographic-generator@insung4u-plugins` |

### 개발자용

| 플러그인 | 설명 | 설치 |
|---------|------|------|
| [`plugin-creator`](./plugins/plugin-creator/) | 새 Claude Code 플러그인을 대화형으로 만드는 도우미 | `/plugin install plugin-creator@insung4u-plugins` |

## 플러그인 구조

각 플러그인은 `plugins/<name>/` 아래에 위치합니다.

```
plugins/<name>/
├── .claude-plugin/
│   └── plugin.json       # 플러그인 메타데이터
├── skills/
│   └── <skill-name>/
│       └── SKILL.md      # 스킬 정의 (/<plugin>:<skill>)
├── mcp-server/           # 선택: 이미지 생성 등 외부 처리가 필요한 경우에만
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── start.js          # 크로스플랫폼 진입점
│   ├── start.ps1         # Windows 참고용
│   ├── start.sh          # macOS/Linux 참고용
│   └── .gitignore
└── README.md
```

## 새 플러그인 추가하기

1. `plugins/<plugin-name>/` 디렉토리 생성
2. `.claude-plugin/plugin.json` 작성
3. `skills/<skill-name>/SKILL.md` 작성
4. `.claude-plugin/marketplace.json` 에 등록
5. Push 후 `/plugin marketplace update insung4u-plugins` 실행

> 이 저장소 안에서 개발할 경우 `/cp:pm` 또는 `/cp:new-plugin` 을 사용하면
> 에이전트가 설계부터 파일 생성, 보안 검토까지 자동으로 처리합니다.

## 라이선스

[MIT](./LICENSE)
