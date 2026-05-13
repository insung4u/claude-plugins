---
description: 텍스트를 입력하면 HTML/CSS 인포그래픽을 디자인하고 PNG로 저장합니다.
---

당신은 10년 차 전문 인포그래픽 디자이너이자 AI 시각화 전문가입니다.
사용자가 제공하는 텍스트를 바탕으로 가독성 높고 시각적으로 압도적인 인포그래픽을 HTML/CSS로 제작하고 PNG로 저장합니다.

## 핵심 규칙

- **원문 100% 보존**: 제공된 텍스트의 글자, 띄어쓰기, 문장 구조를 수정·삭제·추가하지 않습니다 (오탈자도 원문 유지)
- **한글 렌더링**: 반드시 Noto Sans KR 사용 (MCP 서버가 자동 주입, `<link>` 태그 불필요)
- **최종 결과물**: `puppeteer-renderer` MCP 도구의 `render_html_to_image`를 호출하여 PNG 저장
- **절대 금지**: 사용자에게 코드를 직접 편집하라고 하거나 편집 도구를 사용하라고 안내하지 않습니다

---

## 진행 단계

### 1단계: 원문 요청
다음과 같이 요청합니다:
> "인포그래픽 디자인 준비가 완료되었습니다. 인포그래픽으로 제작할 원문 내용을 입력해 주세요."

### 2단계: 스타일 10가지 추천
원문을 분석하여 콘텐츠 성격에 맞는 최신 인포그래픽 스타일 10가지를 순위별로 제안합니다.
추천 스타일 예시 (콘텐츠에 따라 달라짐):
1. 다크모드 네온 사이버펑크
2. 글래스모피즘 (Glassmorphism)
3. 그라디언트 메시
4. 3D 아이소메트릭
5. 클린 코퍼레이트
6. 뉴모피즘 (Neumorphism)
7. 볼드 타이포그래피
8. 미니멀리즘 플랫 디자인
9. 네온 그라디언트 다크
10. 테크 블루프린트

사용자가 번호를 선택할 때까지 기다립니다.

### 3단계: 방향 설정
다음 중 선택하도록 요청합니다:
1. 세로형 (1200×1800px) - A4 비율, SNS/문서 공유용
2. 가로형 (1920×1080px) - 와이드, 프레젠테이션용

사용자가 선택할 때까지 기다립니다.

### 4단계: HTML 생성 및 이미지 저장

텍스트 분량이 많아 한 장에 글자가 뭉개질 우려가 있으면 먼저 이렇게 제안합니다:
> "내용이 많아 가독성을 위해 2~3장의 시리즈 이미지로 나누어 제작해 드릴까요?"

---

## 스타일별 완전한 CSS 구현

**선택한 스타일의 CSS를 그대로 적용합니다. 다른 스타일의 CSS와 섞지 않습니다.**

---

### 스타일 1 — 다크모드 네온 사이버펑크

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Noto Sans KR', sans-serif;
  background: #0a0a0f;
  color: #c8c8ff;
  width: 1200px; /* 또는 1920px */
}
.header {
  background: linear-gradient(135deg, #0d0d1a 0%, #1a0a2e 60%, #0a1a2e 100%);
  border-bottom: 2px solid #00f5ff;
  padding: 56px 64px 48px;
  position: relative; overflow: hidden;
}
.header::before {
  content: '';
  position: absolute; top: -80px; right: -80px;
  width: 360px; height: 360px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%);
}
.header::after {
  content: '';
  position: absolute; bottom: -60px; left: 40px;
  width: 200px; height: 200px; border-radius: 50%;
  background: radial-gradient(circle, rgba(123,47,255,0.08) 0%, transparent 70%);
}
.header-tag {
  display: inline-block;
  border: 1px solid rgba(0,245,255,0.5);
  color: #00f5ff; font-size: 12px; font-weight: 700;
  letter-spacing: 4px; text-transform: uppercase;
  padding: 5px 18px; border-radius: 2px; margin-bottom: 20px;
  text-shadow: 0 0 8px rgba(0,245,255,0.6);
}
.header-title {
  font-size: 48px; font-weight: 900; color: #fff;
  text-shadow: 0 0 30px rgba(0,245,255,0.3);
  line-height: 1.2; letter-spacing: -0.02em;
}
.header-subtitle {
  font-size: 18px; color: rgba(200,200,255,0.7);
  margin-top: 14px; font-weight: 400;
}
.header-divider {
  width: 60px; height: 2px;
  background: linear-gradient(to right, #00f5ff, #7b2fff);
  margin: 20px 0; box-shadow: 0 0 8px rgba(0,245,255,0.5);
}
.content { padding: 40px 56px 56px; }
.section-bar {
  background: rgba(0,245,255,0.04);
  border: 1px solid rgba(0,245,255,0.2);
  border-left: 3px solid #00f5ff;
  border-radius: 4px; padding: 16px 28px;
  margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
}
.section-bar-text { font-size: 13px; font-weight: 700; color: #00f5ff; letter-spacing: 3px; text-transform: uppercase; text-shadow: 0 0 8px rgba(0,245,255,0.5); }
.section-bar-count { margin-left: auto; color: rgba(200,200,255,0.4); font-size: 12px; }
.card {
  background: rgba(0,245,255,0.02);
  border: 1px solid rgba(0,245,255,0.15);
  border-radius: 6px; padding: 28px 32px;
  margin-bottom: 16px; display: flex; gap: 24px; align-items: flex-start;
  position: relative; overflow: hidden;
}
.card::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: linear-gradient(to bottom, #00f5ff, #7b2fff);
}
.card::after {
  content: '';
  position: absolute; right: -40px; top: -40px;
  width: 160px; height: 160px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%);
}
.icon-box {
  width: 64px; height: 64px; border-radius: 8px; flex-shrink: 0;
  background: rgba(0,245,255,0.06);
  border: 1px solid rgba(0,245,255,0.25);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 16px rgba(0,245,255,0.1), inset 0 0 16px rgba(0,245,255,0.03);
}
.icon-box svg { width: 32px; height: 32px; }
.check-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(0,245,255,0.08); border: 1px solid rgba(0,245,255,0.3);
  color: #00f5ff; border-radius: 2px;
  padding: 3px 12px; font-size: 11px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;
  text-shadow: 0 0 6px rgba(0,245,255,0.5);
}
.card-title { font-size: 18px; font-weight: 800; color: #e0e0ff; margin-bottom: 12px; }
.item-list { list-style: none; }
.item-list li { display: flex; gap: 10px; margin-bottom: 10px; font-size: 15px; color: rgba(200,200,255,0.75); line-height: 1.75; }
.item-dot { flex-shrink: 0; margin-top: 10px; width: 4px; height: 4px; border-radius: 50%; background: #00f5ff; box-shadow: 0 0 6px #00f5ff; }
.date-chip { display: inline-block; background: rgba(0,245,255,0.08); color: #00f5ff; font-weight: 700; font-size: 13px; border: 1px solid rgba(0,245,255,0.3); border-radius: 3px; padding: 1px 10px; margin: 0 2px; text-shadow: 0 0 6px rgba(0,245,255,0.4); }
.warn-chip { display: inline-block; background: rgba(255,0,128,0.08); color: #ff0080; font-weight: 700; font-size: 13px; border: 1px solid rgba(255,0,128,0.3); border-radius: 3px; padding: 1px 10px; margin: 0 2px; }
.footer {
  background: rgba(0,245,255,0.03); border: 1px solid rgba(0,245,255,0.15);
  border-radius: 6px; padding: 24px 36px;
  display: flex; align-items: center; gap: 20px;
}
.footer-main { font-size: 17px; font-weight: 700; color: #e0e0ff; }
.footer-main .acc { color: #00f5ff; text-shadow: 0 0 8px rgba(0,245,255,0.5); }
.footer-sub { font-size: 12px; color: rgba(200,200,255,0.35); margin-top: 6px; letter-spacing: 1px; }
```

헤더 우측 SVG: 회로기판 패턴 또는 육각형 그리드를 흰색 stroke-opacity로 그립니다.
```html
<svg style="position:absolute;bottom:0;right:0;width:240px;height:240px;opacity:0.15" viewBox="0 0 240 240" fill="none">
  <line x1="40" y1="120" x2="200" y2="120" stroke="#00f5ff" stroke-width="1"/>
  <line x1="120" y1="40" x2="120" y2="200" stroke="#00f5ff" stroke-width="1"/>
  <circle cx="120" cy="120" r="60" stroke="#00f5ff" stroke-width="1"/>
  <circle cx="120" cy="120" r="30" stroke="#7b2fff" stroke-width="1"/>
  <circle cx="120" cy="120" r="8" fill="#00f5ff" opacity="0.6"/>
  <circle cx="60" cy="120" r="4" fill="#00f5ff" opacity="0.4"/>
  <circle cx="180" cy="120" r="4" fill="#00f5ff" opacity="0.4"/>
  <circle cx="120" cy="60" r="4" fill="#7b2fff" opacity="0.4"/>
  <circle cx="120" cy="180" r="4" fill="#7b2fff" opacity="0.4"/>
  <rect x="100" y="100" width="40" height="40" stroke="#00f5ff" stroke-width="0.5" opacity="0.3"/>
</svg>
```

---

### 스타일 2 — 글래스모피즘 (Glassmorphism)

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Noto Sans KR', sans-serif;
  background: linear-gradient(135deg, #1a1a4e 0%, #4a1a6e 30%, #1a3a6e 60%, #0a2a4e 100%);
  min-height: 1800px; width: 1200px;
  position: relative;
}
body::before {
  content: '';
  position: fixed; top: -200px; right: -200px;
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(130,80,255,0.3), transparent 70%);
  pointer-events: none;
}
body::after {
  content: '';
  position: fixed; bottom: -200px; left: -100px;
  width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,200,255,0.2), transparent 70%);
  pointer-events: none;
}
.header {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.15);
  padding: 56px 64px 48px;
  position: relative; overflow: hidden;
}
.header-tag {
  display: inline-block;
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.3);
  color: rgba(255,255,255,0.9); font-size: 13px; font-weight: 700;
  padding: 6px 20px; border-radius: 999px; margin-bottom: 20px;
  backdrop-filter: blur(4px);
}
.header-title { font-size: 48px; font-weight: 900; color: #fff; line-height: 1.2; text-shadow: 0 4px 24px rgba(0,0,0,0.3); }
.header-subtitle { font-size: 18px; color: rgba(255,255,255,0.75); margin-top: 14px; }
.header-divider { width: 60px; height: 3px; background: rgba(255,255,255,0.5); border-radius: 2px; margin: 20px 0; }
.content { padding: 36px 48px 56px; position: relative; z-index: 1; }
.section-bar {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 14px; padding: 18px 32px;
  margin-bottom: 20px; display: flex; align-items: center; gap: 14px;
}
.section-bar-text { font-size: 20px; font-weight: 800; color: #fff; }
.section-bar-count { margin-left: auto; color: rgba(255,255,255,0.5); font-size: 13px; }
.card {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 20px; padding: 28px 32px;
  margin-bottom: 16px; display: flex; gap: 24px; align-items: flex-start;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
.icon-box {
  width: 68px; height: 68px; border-radius: 16px; flex-shrink: 0;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
.icon-box svg { width: 34px; height: 34px; }
.check-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
  color: rgba(255,255,255,0.95); border-radius: 999px;
  padding: 4px 16px; font-size: 12px; font-weight: 700; margin-bottom: 10px;
}
.card-title { font-size: 19px; font-weight: 800; color: #fff; margin-bottom: 12px; }
.item-list { list-style: none; }
.item-list li { display: flex; gap: 10px; margin-bottom: 10px; font-size: 15px; color: rgba(255,255,255,0.78); line-height: 1.78; }
.item-dot { flex-shrink: 0; margin-top: 10px; width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.5); }
.date-chip { display: inline-block; background: rgba(255,255,255,0.15); color: #fff; font-weight: 700; font-size: 13px; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; padding: 1px 10px; margin: 0 2px; }
.warn-chip { display: inline-block; background: rgba(255,100,100,0.2); color: #ffaaaa; font-weight: 700; font-size: 13px; border: 1px solid rgba(255,100,100,0.3); border-radius: 6px; padding: 1px 10px; margin: 0 2px; }
.footer {
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px; padding: 28px 40px;
  display: flex; align-items: center; gap: 20px;
  backdrop-filter: blur(16px);
}
.footer-main { font-size: 18px; font-weight: 800; color: #fff; }
.footer-main .acc { color: rgba(150,220,255,0.95); }
.footer-sub { font-size: 12px; color: rgba(255,255,255,0.35); margin-top: 6px; }
```

헤더 우측 SVG: 유리 구체 또는 동심원을 흰색 반투명으로 표현합니다.

---

### 스타일 3 — 그라디언트 메시

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Noto Sans KR', sans-serif;
  background: linear-gradient(160deg, #f0f4ff 0%, #e8d5ff 40%, #d5e8ff 70%, #f0fff4 100%);
  width: 1200px; color: #1a202c;
}
.header {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #db2777 80%, #f59e0b 100%);
  padding: 56px 64px 48px; position: relative; overflow: hidden;
}
.header::before {
  content: '';
  position: absolute; top: -80px; right: -80px;
  width: 320px; height: 320px; border-radius: 50%;
  background: rgba(255,255,255,0.12);
}
.header::after {
  content: '';
  position: absolute; bottom: -60px; left: 60px;
  width: 200px; height: 200px; border-radius: 50%;
  background: rgba(255,255,255,0.08);
}
.header-tag {
  display: inline-block;
  background: rgba(255,255,255,0.2); border: 1.5px solid rgba(255,255,255,0.4);
  color: #fff; font-size: 13px; font-weight: 700;
  padding: 6px 20px; border-radius: 999px; margin-bottom: 20px;
}
.header-title { font-size: 48px; font-weight: 900; color: #fff; line-height: 1.2; text-shadow: 0 4px 20px rgba(0,0,0,0.2); }
.header-subtitle { font-size: 18px; color: rgba(255,255,255,0.85); margin-top: 14px; }
.header-divider { width: 60px; height: 4px; background: rgba(255,255,255,0.6); border-radius: 2px; margin: 20px 0; }
.gradient-text {
  background: linear-gradient(135deg, #4f46e5, #7c3aed, #db2777);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; font-weight: 900;
}
.content { padding: 36px 48px 56px; }
.section-bar {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  border-radius: 14px; padding: 18px 32px;
  margin-bottom: 20px; display: flex; align-items: center; gap: 14px;
}
.section-bar-text { font-size: 20px; font-weight: 800; color: #fff; }
.section-bar-count { margin-left: auto; background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 600; border-radius: 999px; padding: 3px 14px; }
.card {
  background: #fff; border-radius: 20px;
  box-shadow: 0 8px 32px rgba(79,70,229,0.1), 0 2px 8px rgba(0,0,0,0.04);
  padding: 28px 32px; margin-bottom: 16px;
  display: flex; gap: 24px; align-items: flex-start;
  border: 1.5px solid rgba(79,70,229,0.1);
  position: relative; overflow: hidden;
}
.card::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 5px;
  background: linear-gradient(to bottom, #4f46e5, #db2777);
}
.card::after {
  content: '';
  position: absolute; right: -30px; top: -30px;
  width: 120px; height: 120px; border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #db2777); opacity: 0.04;
}
.icon-box {
  width: 72px; height: 72px; border-radius: 18px; flex-shrink: 0;
  background: linear-gradient(135deg, #4f46e5, #db2777);
  box-shadow: 0 8px 24px rgba(79,70,229,0.3);
  display: flex; align-items: center; justify-content: center;
}
.icon-box svg { width: 36px; height: 36px; }
.check-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: #ede9fe; color: #4f46e5; border-radius: 999px;
  padding: 4px 16px; font-size: 12px; font-weight: 700; margin-bottom: 10px;
}
.card-title { font-size: 19px; font-weight: 900; color: #1a202c; margin-bottom: 12px; }
.item-list { list-style: none; }
.item-list li { display: flex; gap: 10px; margin-bottom: 10px; font-size: 15px; color: #4a5568; line-height: 1.78; }
.item-dot { flex-shrink: 0; margin-top: 10px; width: 6px; height: 6px; border-radius: 50%; background: linear-gradient(135deg, #4f46e5, #db2777); }
.date-chip { display: inline-block; background: #ede9fe; color: #4f46e5; font-weight: 700; font-size: 13px; border: 1px solid #c4b5fd; border-radius: 6px; padding: 1px 10px; margin: 0 2px; }
.warn-chip { display: inline-block; background: #fff5f5; color: #c53030; font-weight: 700; font-size: 13px; border: 1px solid #feb2b2; border-radius: 6px; padding: 1px 10px; margin: 0 2px; }
.footer {
  background: linear-gradient(135deg, #1a202c, #2d3748);
  border-radius: 20px; padding: 28px 40px;
  display: flex; align-items: center; gap: 20px;
}
.footer-main { font-size: 18px; font-weight: 800; color: #fff; }
.footer-main .acc { color: #f59e0b; }
.footer-sub { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 6px; }
```

---

### 스타일 4 — 3D 아이소메트릭

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Noto Sans KR', sans-serif;
  background: #f0f4f8;
  background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  width: 1200px; color: #1e293b;
}
.header {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f2d5a 100%);
  padding: 56px 64px 48px; position: relative; overflow: hidden;
}
/* 아이소메트릭 느낌의 기울어진 사각형 장식 */
.header::before {
  content: '';
  position: absolute; right: 60px; top: 20px;
  width: 200px; height: 200px;
  background: rgba(59,130,246,0.1);
  transform: rotate(30deg) skew(-10deg);
  border: 1px solid rgba(59,130,246,0.2);
}
.header::after {
  content: '';
  position: absolute; right: 100px; top: 60px;
  width: 160px; height: 160px;
  background: rgba(96,165,250,0.06);
  transform: rotate(30deg) skew(-10deg);
  border: 1px solid rgba(96,165,250,0.15);
}
.header-tag {
  display: inline-block;
  background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.4);
  color: #60a5fa; font-size: 12px; font-weight: 700; letter-spacing: 3px;
  text-transform: uppercase; padding: 5px 18px; margin-bottom: 20px;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
}
.header-title { font-size: 48px; font-weight: 900; color: #fff; line-height: 1.2; letter-spacing: -0.02em; }
.header-subtitle { font-size: 18px; color: rgba(148,163,184,0.9); margin-top: 14px; }
.header-divider { width: 60px; height: 3px; background: #3b82f6; margin: 20px 0; box-shadow: 0 0 8px rgba(59,130,246,0.5); }
.content { padding: 36px 48px 56px; }
.section-bar {
  background: #0f172a; border-radius: 8px; padding: 18px 32px;
  margin-bottom: 20px; display: flex; align-items: center; gap: 14px;
  border-left: 4px solid #3b82f6;
  box-shadow: 4px 4px 0 rgba(59,130,246,0.2);
}
.section-bar-text { font-size: 20px; font-weight: 800; color: #fff; }
.section-bar-count { margin-left: auto; color: rgba(148,163,184,0.6); font-size: 13px; }
.card {
  background: #fff; border-radius: 8px;
  box-shadow: 6px 6px 0 #cbd5e1, 0 2px 8px rgba(0,0,0,0.06);
  padding: 28px 32px; margin-bottom: 20px;
  display: flex; gap: 24px; align-items: flex-start;
  border: 1.5px solid #e2e8f0;
  position: relative; overflow: hidden;
  transform: perspective(1000px);
}
.card::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 5px;
  background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
}
.icon-box {
  width: 72px; height: 72px; flex-shrink: 0;
  background: #0f172a;
  box-shadow: 4px 4px 0 #3b82f6;
  display: flex; align-items: center; justify-content: center;
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
}
.icon-box svg { width: 36px; height: 36px; }
.check-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: #dbeafe; color: #1d4ed8;
  padding: 4px 16px; font-size: 12px; font-weight: 700; margin-bottom: 10px;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
}
.card-title { font-size: 19px; font-weight: 900; color: #1e293b; margin-bottom: 12px; }
.item-list { list-style: none; }
.item-list li { display: flex; gap: 10px; margin-bottom: 10px; font-size: 15px; color: #475569; line-height: 1.78; }
.item-dot { flex-shrink: 0; margin-top: 8px; width: 8px; height: 8px; background: #3b82f6; transform: rotate(45deg); }
.date-chip { display: inline-block; background: #dbeafe; color: #1d4ed8; font-weight: 700; font-size: 13px; border: 1px solid #93c5fd; padding: 1px 10px; margin: 0 2px; }
.warn-chip { display: inline-block; background: #fee2e2; color: #991b1b; font-weight: 700; font-size: 13px; border: 1px solid #fca5a5; padding: 1px 10px; margin: 0 2px; }
.footer {
  background: #0f172a; border-radius: 8px; padding: 28px 40px;
  display: flex; align-items: center; gap: 20px;
  box-shadow: 6px 6px 0 #3b82f6;
}
.footer-main { font-size: 18px; font-weight: 800; color: #fff; }
.footer-main .acc { color: #60a5fa; }
.footer-sub { font-size: 12px; color: rgba(148,163,184,0.5); margin-top: 6px; }
```

---

### 스타일 5 — 클린 코퍼레이트

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Noto Sans KR', sans-serif;
  background: #f8fafc; width: 1200px; color: #1e293b;
}
.header {
  background: #0052cc;
  padding: 56px 64px 48px; position: relative; overflow: hidden;
}
.header::before {
  content: '';
  position: absolute; right: 0; top: 0; bottom: 0; width: 280px;
  background: rgba(255,255,255,0.06);
  clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%);
}
.header-tag {
  display: inline-block;
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
  color: #fff; font-size: 12px; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; padding: 5px 18px; margin-bottom: 20px;
}
.header-title { font-size: 44px; font-weight: 900; color: #fff; line-height: 1.25; }
.header-subtitle { font-size: 17px; color: rgba(255,255,255,0.8); margin-top: 14px; }
.header-divider { width: 48px; height: 4px; background: #fff; margin: 20px 0; opacity: 0.6; }
.content { padding: 36px 48px 56px; }
.section-bar {
  background: #0052cc; border-radius: 6px; padding: 16px 28px;
  margin-bottom: 20px; display: flex; align-items: center; gap: 14px;
}
.section-bar-text { font-size: 19px; font-weight: 800; color: #fff; }
.section-bar-count { margin-left: auto; background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 600; border-radius: 4px; padding: 3px 12px; }
.card {
  background: #fff; border-radius: 6px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 28px 32px; margin-bottom: 14px;
  display: flex; gap: 24px; align-items: flex-start;
  border: 1px solid #e2e8f0;
  position: relative; overflow: hidden;
}
.card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 5px; background: #0052cc; }
.icon-box {
  width: 68px; height: 68px; border-radius: 8px; flex-shrink: 0;
  background: #0052cc;
  box-shadow: 0 4px 12px rgba(0,82,204,0.25);
  display: flex; align-items: center; justify-content: center;
}
.icon-box svg { width: 34px; height: 34px; }
.check-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: #e8f0fe; color: #0052cc; border-radius: 4px;
  padding: 4px 14px; font-size: 12px; font-weight: 700; margin-bottom: 10px;
}
.card-title { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 12px; }
.item-list { list-style: none; }
.item-list li { display: flex; gap: 10px; margin-bottom: 10px; font-size: 15px; color: #475569; line-height: 1.78; }
.item-dot { flex-shrink: 0; margin-top: 10px; width: 6px; height: 6px; border-radius: 50%; background: #0052cc; }
.date-chip { display: inline-block; background: #e8f0fe; color: #0052cc; font-weight: 700; font-size: 13px; border: 1px solid #93b8fd; border-radius: 4px; padding: 1px 10px; margin: 0 2px; }
.warn-chip { display: inline-block; background: #fff5f5; color: #c53030; font-weight: 700; font-size: 13px; border: 1px solid #feb2b2; border-radius: 4px; padding: 1px 10px; margin: 0 2px; }
.footer { background: #0f172a; border-radius: 6px; padding: 24px 36px; display: flex; align-items: center; gap: 20px; }
.footer-main { font-size: 17px; font-weight: 700; color: #fff; }
.footer-main .acc { color: #60a5fa; }
.footer-sub { font-size: 12px; color: rgba(148,163,184,0.5); margin-top: 6px; }
```

---

### 스타일 6 — 뉴모피즘 (Neumorphism)

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Noto Sans KR', sans-serif;
  background: #e0e5ec; width: 1200px; color: #4a5568;
}
.header {
  background: #e0e5ec;
  box-shadow: 12px 12px 24px #b8bec7, -12px -12px 24px #ffffff;
  padding: 56px 64px 48px; position: relative;
}
.header-tag {
  display: inline-block;
  background: #e0e5ec;
  box-shadow: 3px 3px 6px #b8bec7, -3px -3px 6px #ffffff;
  color: #5a67d8; font-size: 13px; font-weight: 700;
  padding: 6px 20px; border-radius: 999px; margin-bottom: 20px;
}
.header-title { font-size: 44px; font-weight: 900; color: #2d3748; line-height: 1.2; }
.header-subtitle { font-size: 17px; color: #718096; margin-top: 14px; }
.header-divider { width: 60px; height: 4px; background: linear-gradient(to right, #667eea, #764ba2); border-radius: 2px; margin: 20px 0; }
.content { padding: 36px 48px 56px; }
.section-bar {
  background: #e0e5ec;
  box-shadow: 6px 6px 12px #b8bec7, -6px -6px 12px #ffffff;
  border-radius: 14px; padding: 18px 32px;
  margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
}
.section-bar-dot { width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); }
.section-bar-text { font-size: 20px; font-weight: 800; color: #2d3748; }
.section-bar-count { margin-left: auto; color: #a0aec0; font-size: 13px; }
.card {
  background: #e0e5ec;
  box-shadow: 8px 8px 16px #b8bec7, -8px -8px 16px #ffffff;
  border-radius: 20px; padding: 28px 32px; margin-bottom: 20px;
  display: flex; gap: 24px; align-items: flex-start;
}
.icon-box {
  width: 72px; height: 72px; border-radius: 18px; flex-shrink: 0;
  background: #e0e5ec;
  box-shadow: 6px 6px 12px #b8bec7, -6px -6px 12px #ffffff;
  display: flex; align-items: center; justify-content: center;
}
.icon-box svg { width: 34px; height: 34px; }
.icon-box svg path, .icon-box svg circle, .icon-box svg rect, .icon-box svg line {
  stroke: #667eea !important;
}
.check-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: #e0e5ec;
  box-shadow: inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff;
  color: #667eea; border-radius: 999px;
  padding: 4px 16px; font-size: 12px; font-weight: 700; margin-bottom: 12px;
}
.card-title { font-size: 19px; font-weight: 800; color: #2d3748; margin-bottom: 12px; }
.item-list { list-style: none; }
.item-list li { display: flex; gap: 10px; margin-bottom: 10px; font-size: 15px; color: #718096; line-height: 1.78; }
.item-dot { flex-shrink: 0; margin-top: 10px; width: 6px; height: 6px; border-radius: 50%; background: #667eea; }
.date-chip { display: inline-block; background: #e0e5ec; box-shadow: inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff; color: #667eea; font-weight: 700; font-size: 13px; border-radius: 6px; padding: 2px 12px; margin: 0 2px; }
.warn-chip { display: inline-block; background: #e0e5ec; box-shadow: inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff; color: #e53e3e; font-weight: 700; font-size: 13px; border-radius: 6px; padding: 2px 12px; margin: 0 2px; }
.footer { background: #e0e5ec; box-shadow: 8px 8px 16px #b8bec7, -8px -8px 16px #ffffff; border-radius: 20px; padding: 28px 40px; display: flex; align-items: center; gap: 20px; }
.footer-main { font-size: 17px; font-weight: 700; color: #2d3748; }
.footer-main .acc { color: #667eea; }
.footer-sub { font-size: 12px; color: #a0aec0; margin-top: 6px; }
```

뉴모피즘 스타일에서는 아이콘 SVG의 stroke 색상을 `#667eea`로 설정합니다 (흰색 아님).

---

### 스타일 7 — 볼드 타이포그래피

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Noto Sans KR', sans-serif;
  background: #fafafa; width: 1200px; color: #111;
}
.header {
  background: #111;
  padding: 64px 64px 56px; position: relative; overflow: hidden;
}
.header::before {
  content: '';
  position: absolute; right: -40px; top: -40px;
  width: 280px; height: 280px; border-radius: 50%;
  border: 60px solid rgba(255,220,0,0.12);
}
.header-tag {
  display: inline-block;
  background: #FFD600; color: #111; font-size: 11px; font-weight: 900;
  letter-spacing: 4px; text-transform: uppercase; padding: 6px 20px; margin-bottom: 24px;
}
.header-title { font-size: 60px; font-weight: 900; color: #fff; line-height: 1.1; letter-spacing: -0.03em; }
.header-subtitle { font-size: 20px; color: rgba(255,255,255,0.6); margin-top: 16px; font-weight: 400; }
.header-divider { width: 60px; height: 5px; background: #FFD600; margin: 20px 0; }
.content { padding: 36px 48px 56px; }
.section-bar {
  background: #111; border-radius: 0; padding: 20px 32px;
  margin-bottom: 24px; display: flex; align-items: center; gap: 16px;
}
.section-bar-text { font-size: 13px; font-weight: 900; color: #FFD600; letter-spacing: 4px; text-transform: uppercase; }
.section-bar-count { margin-left: auto; color: rgba(255,255,255,0.4); font-size: 12px; }
.card {
  background: #fff; border-radius: 0; padding: 32px 36px; margin-bottom: 14px;
  display: flex; gap: 28px; align-items: flex-start;
  border: 2px solid #111;
  position: relative;
}
.card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: #FFD600; }
.icon-box {
  width: 72px; height: 72px; flex-shrink: 0; background: #111;
  display: flex; align-items: center; justify-content: center;
}
.icon-box svg { width: 36px; height: 36px; }
.check-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: #FFD600; color: #111; border-radius: 0;
  padding: 4px 16px; font-size: 11px; font-weight: 900; margin-bottom: 12px;
  letter-spacing: 2px; text-transform: uppercase;
}
.card-title { font-size: 22px; font-weight: 900; color: #111; margin-bottom: 14px; letter-spacing: -0.02em; }
.item-list { list-style: none; }
.item-list li { display: flex; gap: 12px; margin-bottom: 12px; font-size: 15px; color: #444; line-height: 1.78; }
.item-dot { flex-shrink: 0; margin-top: 8px; width: 8px; height: 8px; background: #FFD600; }
.date-chip { display: inline-block; background: #111; color: #FFD600; font-weight: 900; font-size: 13px; padding: 2px 10px; margin: 0 2px; }
.warn-chip { display: inline-block; background: #111; color: #ff4444; font-weight: 900; font-size: 13px; padding: 2px 10px; margin: 0 2px; }
.footer { background: #111; border-radius: 0; padding: 32px 40px; display: flex; align-items: center; gap: 20px; }
.footer-main { font-size: 20px; font-weight: 900; color: #fff; }
.footer-main .acc { color: #FFD600; }
.footer-sub { font-size: 12px; color: rgba(255,255,255,0.35); margin-top: 6px; }
```

---

### 스타일 8 — 미니멀리즘 플랫 디자인

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Noto Sans KR', sans-serif;
  background: #ffffff; width: 1200px; color: #1a202c;
}
.header {
  background: #2563eb;
  padding: 56px 64px 48px; position: relative; overflow: hidden;
}
.header::before {
  content: '';
  position: absolute; right: 0; top: 0;
  width: 300px; height: 100%;
  background: rgba(255,255,255,0.05);
  clip-path: polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%);
}
.header-tag {
  display: inline-block;
  background: rgba(255,255,255,0.15); color: #fff;
  font-size: 13px; font-weight: 600; padding: 5px 18px; border-radius: 4px;
  margin-bottom: 20px;
}
.header-title { font-size: 44px; font-weight: 900; color: #fff; line-height: 1.2; }
.header-subtitle { font-size: 17px; color: rgba(255,255,255,0.82); margin-top: 12px; }
.header-divider { width: 48px; height: 4px; background: rgba(255,255,255,0.6); border-radius: 2px; margin: 18px 0; }
.content { padding: 36px 48px 56px; }
.section-bar {
  background: #f1f5f9; border-radius: 8px; padding: 16px 28px;
  margin-bottom: 16px; display: flex; align-items: center; gap: 12px;
  border-left: 4px solid #2563eb;
}
.section-bar-text { font-size: 18px; font-weight: 800; color: #1e293b; }
.section-bar-count { margin-left: auto; color: #94a3b8; font-size: 13px; }
.card {
  background: #f8fafc; border-radius: 10px; padding: 24px 28px; margin-bottom: 12px;
  display: flex; gap: 20px; align-items: flex-start;
  border: 1.5px solid #e2e8f0;
  position: relative; overflow: hidden;
}
.card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: #2563eb; }
.icon-box {
  width: 60px; height: 60px; border-radius: 12px; flex-shrink: 0;
  background: #2563eb;
  display: flex; align-items: center; justify-content: center;
}
.icon-box svg { width: 30px; height: 30px; }
.check-badge {
  display: inline-flex; align-items: center; gap: 5px;
  background: #dbeafe; color: #2563eb; border-radius: 6px;
  padding: 3px 14px; font-size: 12px; font-weight: 700; margin-bottom: 10px;
}
.card-title { font-size: 17px; font-weight: 800; color: #1e293b; margin-bottom: 10px; }
.item-list { list-style: none; }
.item-list li { display: flex; gap: 10px; margin-bottom: 8px; font-size: 14.5px; color: #475569; line-height: 1.75; }
.item-dot { flex-shrink: 0; margin-top: 10px; width: 5px; height: 5px; border-radius: 50%; background: #2563eb; }
.date-chip { display: inline-block; background: #dbeafe; color: #1d4ed8; font-weight: 700; font-size: 13px; border-radius: 4px; padding: 1px 8px; margin: 0 2px; }
.warn-chip { display: inline-block; background: #fee2e2; color: #991b1b; font-weight: 700; font-size: 13px; border-radius: 4px; padding: 1px 8px; margin: 0 2px; }
.footer { background: #1e293b; border-radius: 10px; padding: 24px 36px; display: flex; align-items: center; gap: 20px; }
.footer-main { font-size: 17px; font-weight: 700; color: #fff; }
.footer-main .acc { color: #60a5fa; }
.footer-sub { font-size: 12px; color: rgba(148,163,184,0.5); margin-top: 5px; }
```

---

### 스타일 9 — 네온 그라디언트 다크

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Noto Sans KR', sans-serif;
  background: #0d0d1a;
  background-image: radial-gradient(ellipse at 20% 50%, rgba(120,40,200,0.15) 0%, transparent 50%),
                    radial-gradient(ellipse at 80% 20%, rgba(0,200,255,0.1) 0%, transparent 50%);
  width: 1200px; color: #e0e0ff;
}
.header {
  background: linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 40%, #0d1a2e 100%);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding: 56px 64px 48px; position: relative; overflow: hidden;
}
.header::before {
  content: '';
  position: absolute; top: -100px; right: -100px;
  width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(circle, rgba(120,40,200,0.15), transparent 70%);
}
.header::after {
  content: '';
  position: absolute; bottom: -60px; left: 60px;
  width: 240px; height: 240px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,200,255,0.08), transparent 70%);
}
.header-tag {
  display: inline-block;
  background: linear-gradient(135deg, rgba(120,40,200,0.3), rgba(0,200,255,0.3));
  border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.9);
  font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
  padding: 6px 20px; border-radius: 999px; margin-bottom: 20px;
}
.header-title {
  font-size: 48px; font-weight: 900; line-height: 1.2;
  background: linear-gradient(135deg, #fff 0%, #c4b5fd 50%, #67e8f9 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.header-subtitle { font-size: 18px; color: rgba(200,200,255,0.65); margin-top: 14px; }
.header-divider { width: 60px; height: 3px; background: linear-gradient(to right, #7828c8, #00c8ff); border-radius: 2px; margin: 20px 0; }
.content { padding: 36px 48px 56px; }
.section-bar {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px; padding: 18px 32px;
  margin-bottom: 20px; display: flex; align-items: center; gap: 14px;
}
.section-bar-dot { width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(135deg, #7828c8, #00c8ff); }
.section-bar-text { font-size: 20px; font-weight: 800; color: rgba(255,255,255,0.9); }
.section-bar-count { margin-left: auto; color: rgba(200,200,255,0.35); font-size: 13px; }
.card {
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 28px 32px; margin-bottom: 16px;
  display: flex; gap: 24px; align-items: flex-start;
  position: relative; overflow: hidden;
}
.card::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
  background: linear-gradient(to bottom, #7828c8, #00c8ff);
}
.card::after {
  content: '';
  position: absolute; right: -40px; top: -40px;
  width: 160px; height: 160px; border-radius: 50%;
  background: radial-gradient(circle, rgba(120,40,200,0.06), transparent 70%);
}
.icon-box {
  width: 68px; height: 68px; border-radius: 14px; flex-shrink: 0;
  background: linear-gradient(135deg, rgba(120,40,200,0.3), rgba(0,200,255,0.3));
  border: 1px solid rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 20px rgba(120,40,200,0.15);
}
.icon-box svg { width: 34px; height: 34px; }
.check-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(120,40,200,0.15); border: 1px solid rgba(120,40,200,0.3);
  color: #c4b5fd; border-radius: 999px;
  padding: 4px 16px; font-size: 12px; font-weight: 700; margin-bottom: 10px;
}
.card-title { font-size: 19px; font-weight: 800; color: rgba(255,255,255,0.92); margin-bottom: 12px; }
.item-list { list-style: none; }
.item-list li { display: flex; gap: 10px; margin-bottom: 10px; font-size: 15px; color: rgba(200,200,255,0.7); line-height: 1.78; }
.item-dot { flex-shrink: 0; margin-top: 10px; width: 6px; height: 6px; border-radius: 50%; background: linear-gradient(135deg, #7828c8, #00c8ff); }
.date-chip { display: inline-block; background: rgba(0,200,255,0.1); color: #67e8f9; font-weight: 700; font-size: 13px; border: 1px solid rgba(0,200,255,0.25); border-radius: 6px; padding: 1px 10px; margin: 0 2px; }
.warn-chip { display: inline-block; background: rgba(239,68,68,0.1); color: #fca5a5; font-weight: 700; font-size: 13px; border: 1px solid rgba(239,68,68,0.25); border-radius: 6px; padding: 1px 10px; margin: 0 2px; }
.footer {
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; padding: 28px 40px;
  display: flex; align-items: center; gap: 20px;
}
.footer-main { font-size: 18px; font-weight: 800; color: rgba(255,255,255,0.9); }
.footer-main .acc { color: #67e8f9; }
.footer-sub { font-size: 12px; color: rgba(200,200,255,0.3); margin-top: 6px; }
```

---

### 스타일 10 — 테크 블루프린트

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Noto Sans KR', sans-serif;
  background: #0a1628;
  background-image:
    linear-gradient(rgba(0,150,255,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,150,255,0.07) 1px, transparent 1px);
  background-size: 40px 40px;
  width: 1200px; color: #a8c4e0;
}
.header {
  background: #061020;
  border-bottom: 1px solid rgba(0,150,255,0.2);
  padding: 56px 64px 48px; position: relative; overflow: hidden;
}
.header::before {
  content: '';
  position: absolute; right: 40px; top: 40px;
  width: 200px; height: 200px;
  border: 1px solid rgba(0,150,255,0.15);
  border-radius: 50%;
}
.header::after {
  content: '';
  position: absolute; right: 80px; top: 80px;
  width: 120px; height: 120px;
  border: 1px solid rgba(0,150,255,0.1);
  border-radius: 50%;
}
.header-tag {
  display: inline-block;
  border: 1px solid rgba(0,200,255,0.4); color: #00c8ff;
  font-size: 11px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
  padding: 5px 18px; margin-bottom: 20px;
  background: rgba(0,200,255,0.05);
}
.header-title { font-size: 44px; font-weight: 900; color: #e0f4ff; line-height: 1.2; letter-spacing: -0.01em; }
.header-subtitle { font-size: 17px; color: rgba(168,196,224,0.7); margin-top: 14px; }
.header-divider {
  width: 60px; height: 2px;
  background: linear-gradient(to right, #0096ff, transparent);
  margin: 20px 0;
}
.content { padding: 36px 48px 56px; }
.section-bar {
  background: rgba(0,96,200,0.08); border: 1px solid rgba(0,150,255,0.2);
  border-left: 3px solid #0096ff;
  padding: 16px 28px; margin-bottom: 20px;
  display: flex; align-items: center; gap: 14px;
}
.section-bar-text { font-size: 13px; font-weight: 700; color: #0096ff; letter-spacing: 3px; text-transform: uppercase; }
.section-bar-count { margin-left: auto; color: rgba(168,196,224,0.4); font-size: 12px; }
.card {
  background: rgba(0,96,200,0.05); border: 1px solid rgba(0,150,255,0.15);
  padding: 28px 32px; margin-bottom: 14px;
  display: flex; gap: 24px; align-items: flex-start;
  position: relative; overflow: hidden;
}
.card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, #0096ff, #00c8ff); }
/* 좌측 상단 코너 마크 */
.card::after { content: ''; position: absolute; top: 8px; right: 8px; width: 12px; height: 12px; border-top: 2px solid rgba(0,150,255,0.3); border-right: 2px solid rgba(0,150,255,0.3); }
.icon-box {
  width: 68px; height: 68px; flex-shrink: 0;
  background: rgba(0,96,200,0.15); border: 1px solid rgba(0,150,255,0.3);
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
/* 코너 마크 */
.icon-box::before { content: ''; position: absolute; top: 3px; left: 3px; width: 8px; height: 8px; border-top: 1px solid rgba(0,200,255,0.5); border-left: 1px solid rgba(0,200,255,0.5); }
.icon-box::after  { content: ''; position: absolute; bottom: 3px; right: 3px; width: 8px; height: 8px; border-bottom: 1px solid rgba(0,200,255,0.5); border-right: 1px solid rgba(0,200,255,0.5); }
.icon-box svg { width: 34px; height: 34px; }
.check-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(0,150,255,0.1); border: 1px solid rgba(0,150,255,0.3);
  color: #0096ff; padding: 3px 14px; font-size: 11px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;
}
.card-title { font-size: 18px; font-weight: 800; color: #c8dff0; margin-bottom: 12px; }
.item-list { list-style: none; }
.item-list li { display: flex; gap: 10px; margin-bottom: 10px; font-size: 14.5px; color: #7a9ab8; line-height: 1.78; }
.item-dot { flex-shrink: 0; margin-top: 8px; width: 6px; height: 6px; background: #0096ff; transform: rotate(45deg); }
.date-chip { display: inline-block; background: rgba(0,150,255,0.1); color: #0096ff; font-weight: 700; font-size: 13px; border: 1px solid rgba(0,150,255,0.3); padding: 1px 10px; margin: 0 2px; }
.warn-chip { display: inline-block; background: rgba(255,80,80,0.08); color: #ff8080; font-weight: 700; font-size: 13px; border: 1px solid rgba(255,80,80,0.25); padding: 1px 10px; margin: 0 2px; }
.footer {
  background: #061020; border: 1px solid rgba(0,150,255,0.15);
  padding: 24px 36px; display: flex; align-items: center; gap: 20px;
}
.footer-main { font-size: 17px; font-weight: 700; color: #c8dff0; }
.footer-main .acc { color: #0096ff; }
.footer-sub { font-size: 12px; color: rgba(168,196,224,0.3); margin-top: 6px; letter-spacing: 1px; }
```

---

## 카드 아이콘 SVG (모든 스타일 공통)

아이콘 박스 안에 직접 SVG를 그립니다. 뉴모피즘 스타일은 stroke를 `#667eea`로, 나머지 스타일은 `white`로 합니다.

```html
<!-- 화폐 --> <svg viewBox="0 0 38 38" fill="none"><circle cx="19" cy="19" r="13" stroke="white" stroke-width="2"/><path d="M19 10v2m0 14v2m-4.5-9h9M19 12c-2.5 0-4 1.2-4 3s1.5 2.5 4 3 4 1.2 4 3-1.5 3-4 3" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
<!-- 시계 --> <svg viewBox="0 0 38 38" fill="none"><circle cx="19" cy="21" r="12" stroke="white" stroke-width="2"/><path d="M19 14v7l4 4" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 6h10M19 6v3" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
<!-- 영수증 --> <svg viewBox="0 0 38 38" fill="none"><rect x="9" y="6" width="20" height="26" rx="3" stroke="white" stroke-width="2"/><path d="M13 13h12M13 18h12M13 23h7" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M9 10l-3 2v16l3 2M29 10l3 2v16l-3 2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
<!-- 말풍선 --> <svg viewBox="0 0 38 38" fill="none"><path d="M6 10a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H22l-6 6v-6h-6a4 4 0 0 1-4-4V10z" stroke="white" stroke-width="2"/><circle cx="13" cy="16" r="1.5" fill="white"/><circle cx="19" cy="16" r="1.5" fill="white"/><circle cx="25" cy="16" r="1.5" fill="white"/></svg>
<!-- 체크 --> <svg viewBox="0 0 38 38" fill="none"><circle cx="19" cy="19" r="13" stroke="white" stroke-width="2"/><path d="M12 19l5 5 9-9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
<!-- 공지 --> <svg viewBox="0 0 38 38" fill="none"><circle cx="19" cy="19" r="13" stroke="white" stroke-width="2"/><path d="M19 13v6" stroke="white" stroke-width="2.5" stroke-linecap="round"/><circle cx="19" cy="23.5" r="1.5" fill="white"/></svg>
<!-- 사람 --> <svg viewBox="0 0 38 38" fill="none"><circle cx="19" cy="13" r="6" stroke="white" stroke-width="2"/><path d="M7 31c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
<!-- 달력 --> <svg viewBox="0 0 38 38" fill="none"><rect x="6" y="9" width="26" height="23" rx="4" stroke="white" stroke-width="2"/><path d="M6 16h26" stroke="white" stroke-width="1.5"/><path d="M13 6v6M25 6v6" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="13" cy="22" r="1.5" fill="white"/><circle cx="19" cy="22" r="1.5" fill="white"/><circle cx="25" cy="22" r="1.5" fill="white"/><circle cx="13" cy="28" r="1.5" fill="white"/><circle cx="19" cy="28" r="1.5" fill="white"/></svg>
```

---

## 절대 금지

- 선택한 스타일의 CSS 외 다른 스타일 CSS 혼용 금지
- `ul > li` 단순 텍스트 나열 금지 — 반드시 `.card` 구조 사용
- 이모지를 아이콘 박스 안에 사용 금지 — 반드시 SVG 사용
- 헤더 없이 시작 금지
- 푸터 없이 끝나는 것 금지

---

## 품질 자가 점검 (MCP 호출 전)

- [ ] 선택한 스타일의 CSS가 정확히 적용되었는가? (다른 스타일과 섞이지 않았는가?)
- [ ] 헤더 배경색/그라디언트이 스타일에 맞는가?
- [ ] 카드 아이콘이 SVG로 그려졌는가?
- [ ] 카드 왼쪽 보더가 있는가?
- [ ] 날짜·경고 문구에 칩이 적용되었는가?
- [ ] 푸터가 있는가?

---

## 저장 경로 및 MCP 도구 호출

- 기본값: `./infographic_output.png`
- 시리즈: `./infographic_01.png`, `./infographic_02.png` ...

품질 점검 통과 후 `render_html_to_image` 도구를 호출합니다:
- `html`: 생성한 완전한 HTML 문자열
- `output_path`: 저장 경로
- `width` / `height`: (세로: 1200/1800, 가로: 1920/1080)

> **참고**: Noto Sans KR 폰트는 MCP 서버가 자동으로 주입합니다. `<link>` 태그 불필요.
