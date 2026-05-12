# /cp:validate — 플러그인 검증

플러그인이 마켓플레이스 기준을 충족하는지 검사합니다.

## 사용법

```
/cp:validate                          # 모든 플러그인 검사
/cp:validate infographic-generator    # 특정 플러그인 검사
```

## 검사 항목

**plugin-reviewer** — 구조 검사:
1. **파일 구조** — 필수 파일 존재 여부
2. **plugin.json** — 형식 및 내용 유효성
3. **SKILL.md** — frontmatter 및 지시문 품질
4. **MCP 서버** — 크로스플랫폼 호환성 (있을 경우)
5. **마켓플레이스 등록** — marketplace.json 항목 확인

**plugin-security** — MCP 서버가 있는 플러그인에 추가 실행:
1. **커맨드 인젝션** — 사용자 입력이 execSync 등에 그대로 전달되는지
2. **경로 탐색** — 파일 경로 처리의 path traversal 위험
3. **npm 패키지** — 검증된 패키지 목록 외 사용 여부
4. **외부 데이터 전송** — 사용자 데이터의 무단 외부 전송 여부
5. **plugin.json command** — node/npx 외 다른 명령어 사용 여부

## 결과 형식

각 항목에 ✅ / ⚠️ / ❌ 로 표시하고,
문제가 있으면 즉시 수정합니다.
MCP 서버 보안 검토 최종 판정: 🟢 통과 / 🟡 주의 / 🔴 수정 필요

---

$ARGUMENTS
