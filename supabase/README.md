# Supabase 설정 (처음 한 번, 약 10분)

## 1. 프로젝트 만들기
1. https://supabase.com 에서 로그인 → **New project**
2. 이름 `fridge`, 지역 **Northeast Asia (Seoul)**, DB 비밀번호는 팀만 알게 보관
3. 팀원 초대: Organization > Members

## 2. 테이블 · 함수 · 보안 규칙 만들기
대시보드 왼쪽 **SQL Editor** → New query → 아래 파일 내용을 붙여넣고 **Run**. 꼭 이 순서로 실행해.

| 순서 | 파일 | 내용 |
|---|---|---|
| 1 | `01_schema.sql` | 테이블 17개 (ERD 기준) |
| 2 | `02_functions.sql` | 재료 검색 · 추천 · 레시피 상세 · 등록 함수, 찜 수 · 평균 평점 자동 계산 |
| 3 | `03_security.sql` | 보안 규칙 (RLS). **빼먹으면 누구나 남의 데이터를 바꿀 수 있음** |
| 4 | `04_storage.sql` | 사진 저장소 `recipe-photos` |
| 5 | `seed.sql` | 재료 28개 · 별칭 20개 · 샘플 레시피 12개 |
| 6 | `05_recipe_detail.sql` | 레시피 12개 상세화(소개·분류·팁·재료·조리 단계), 양념 9개 추가, 냉장고 모델 저장, 회원 탈퇴 함수 |

다시 처음부터 만들고 싶으면 Database > Tables 에서 테이블을 지우고 1번부터 다시 실행.

## 3. 로그인 설정
Authentication > Sign In / Providers > Email
- 개발하는 동안은 **Confirm email 끄기** (가입하자마자 로그인됨)
- 발표 전에 다시 켤지 팀에서 결정

## 4. 프론트엔드 연결
Project Settings > API (또는 Data API) 에서 두 값을 복사해서 `frontend/.env` 파일로 저장:
```
VITE_SUPABASE_URL=https://프로젝트ID.supabase.co
VITE_SUPABASE_ANON_KEY=anon public 키
```
`npm run dev` 를 껐다 켜면 적용돼. `.env` 는 GitHub에 올리지 마 (`.gitignore`에 들어 있음).
anon 키는 화면 코드에 들어가도 되는 공개용 키야. **service_role 키는 절대 프론트엔드에 넣지 마.**

## 5. 관리자 지정 (신고 처리용)
회원가입한 뒤 SQL Editor에서:
```sql
insert into admin (admin_id) select id from profiles where email = '관리자이메일@example.com';
```

## 주의
- 무료 프로젝트는 일주일 동안 접속이 없으면 일시정지돼. 대시보드에서 Restore 누르면 다시 켜짐. **발표 전날 꼭 확인.**
