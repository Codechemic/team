# 냉장고를 부탁해

냉장고 속 재료를 입력하면 만들 수 있는 요리를 재료 일치율 순으로 추천하는 모바일 웹.
**React (Vite) + Supabase (PostgreSQL · Auth · Storage)**

| 폴더 | 내용 |
|---|---|
| `frontend/` | 화면 9개 + 로그인, 공통 컴포넌트 5개. Supabase 설정 전에는 mock 데이터로 동작 |
| `supabase/` | 테이블 · DB 함수 · 보안 규칙 · 사진 저장소 · 초기 데이터 SQL, 설정 방법(`supabase/README.md`) |
| `docs/API.md` | 화면 ↔ Supabase 호출 정리 (클래스 다이어그램 서비스 기준) |

## 실행
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```
Supabase에 연결하려면 `supabase/README.md` 순서대로 프로젝트를 만들고 `frontend/.env`에 URL과 anon 키를 넣으면 돼.

## 화면 ↔ 파일
| 화면 (흐름도 번호) | 경로 | 파일 |
|---|---|---|
| 1-① 홈 | `/` | `pages/Home.jsx` |
| 1-② 재료 검색 | `/search` | `pages/Search.jsx` |
| 1-③ 재료 선택 완료 | `/selected` | `pages/Selected.jsx` |
| 1-④ 추천 요리 목록 | `/results` | `pages/Results.jsx` |
| 1-⑤ 레시피 상세 | `/recipes/:id` | `pages/RecipeDetail.jsx` |
| 1-⑥ 조리 방법 | `/recipes/:id/cook` | `pages/Cook.jsx` |
| 2 레시피 등록 1~4 | `/register` | `pages/Register.jsx` |
| 3 찜 목록 | `/favorites` | `pages/Favorites.jsx` |
| 4 마이페이지 | `/my` | `pages/MyPage.jsx` |
| 회원가입 · 로그인 | `/login` | `pages/Login.jsx` |

## 아직 안 된 부분
- 후기 · 댓글 · 알림 화면 (DB 테이블과 권한은 준비됨)
- 관리자 신고 처리 화면 (DB 권한은 준비됨, 지금은 Supabase 대시보드에서 처리)
- 최근 검색어 · 내 냉장고는 아직 기기에만 저장 (DB 테이블 준비됨)
