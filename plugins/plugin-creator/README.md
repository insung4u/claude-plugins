# plugin-creator

Claude Code 플러그인을 대화형으로 만들어주는 플러그인 생성 도우미입니다.
아이디어만 말하면 완전한 플러그인을 자동으로 생성합니다.

## 요구 사항

- Claude Code
- 지원 플랫폼: Windows, macOS, Linux

## 설치

```shell
/plugin marketplace add insung4u/claude-plugins
```

## 스킬 목록

| 스킬 | 사용법 | 설명 |
|------|--------|------|
| `new-plugin` | `/plugin-creator:new-plugin` | 새 플러그인을 처음부터 생성 |
| `add-skill` | `/plugin-creator:add-skill` | 기존 플러그인에 스킬 추가 |
| `add-mcp` | `/plugin-creator:add-mcp` | 기존 플러그인에 MCP 서버 추가 |

## 사용 예시

### 새 플러그인 만들기

```
/plugin-creator:new-plugin
```

Claude가 단계별로 안내합니다:
1. 어떤 플러그인인지 설명
2. 설계안 확인
3. 모든 파일 자동 생성
4. 마켓플레이스 등록

### 기존 플러그인에 스킬 추가

```
/plugin-creator:add-skill
```

### MCP 서버 추가 (이미지 생성 등)

```
/plugin-creator:add-mcp
```

이미지 생성, 브라우저 자동화 등 외부 기능이 필요할 때 사용합니다.

## 테스트 방법

플러그인 설치 후 각 스킬이 정상 작동하는지 확인합니다:

1. `/plugin-creator:new-plugin` 입력 → Claude가 아이디어를 묻는지 확인
2. `/plugin-creator:add-skill` 입력 → 대상 플러그인 이름을 묻는지 확인
3. `/plugin-creator:add-mcp` 입력 → MCP 서버가 필요한 기능을 묻는지 확인

## 생성되는 플러그인 특징

- **크로스플랫폼**: Windows, macOS, Linux 모두 동작
- **초보자 친화적**: 추가 설정 없이 바로 사용 가능
- **한글 완벽 지원**: 로컬 폰트 번들 (인터넷 없이도 동작)
- **마켓플레이스 자동 등록**: `marketplace.json` 자동 업데이트
