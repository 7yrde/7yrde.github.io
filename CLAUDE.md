# 7yrde.github.io — CLAUDE.md

## 작업 방식

- **브랜치 없이 main에 직접 커밋·푸시**한다.
- PR은 사용자가 명시적으로 요청할 때만 생성한다.

## 사이트 구조

```
7yrde.github.io/
├── index.html        # 메인 랜딩 (7년의 밤)
├── auth.js           # 비밀번호 인증 오버레이 (모든 페이지 공통)
├── proj/
│   └── index.html   # 프로젝트 목록 페이지
└── 7-dashboard/
    └── index.html   # 2026 신년계획 대시보드
```

## 인증

- 모든 페이지에 `<script src="/auth.js"></script>` 포함.
- 비밀번호는 SHA-256 해시로 비교 (`auth.js` 내 `HASH` 상수).
- 인증 상태는 `sessionStorage`에 보관.

## 주의사항

- 개인 식별 정보(이메일, SNS ID, 실명 등)는 페이지에 넣지 않는다.
- 내부 Jira/Confluence 참조(이슈 키, URL 등)는 노출하지 않는다.
