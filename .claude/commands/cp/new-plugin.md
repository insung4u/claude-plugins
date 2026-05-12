# /cp:new-plugin — 새 플러그인 생성

새 플러그인을 처음부터 만들어 마켓플레이스에 등록합니다.

## 사용법

```
/cp:new-plugin                      # 대화형으로 진행
/cp:new-plugin PDF를 요약해주는 플러그인  # 아이디어를 바로 전달
```

## 진행 단계

### 1단계: 요구사항 파악
아직 제공되지 않은 정보를 질문합니다:
- 어떤 기능을 하는 플러그인인가요?
- 주요 사용 시나리오는 어떻게 되나요?

### 2단계: 설계 (plugin-architect)
- MCP 서버 필요 여부 결정
- 스킬 목록 구성
- 파일 구조 설계
- **설계안을 보여주고 승인 후 진행**

### 3단계: 구현 (plugin-developer)
순서대로 파일 생성:
1. `plugins/<name>/.claude-plugin/plugin.json`
2. `plugins/<name>/skills/<skill>/SKILL.md`
3. MCP 서버 파일 (필요 시)
4. `plugins/<name>/README.md`
5. `.claude-plugin/marketplace.json` 업데이트

### 4단계: 검토 (plugin-reviewer)
생성된 플러그인 품질 검토 및 수정

### 5단계: 완료 안내
- 설치 방법: `/plugin install <name>@insung4u-plugins`
- 사용 방법: `/<name>:<skill>`

---

$ARGUMENTS
