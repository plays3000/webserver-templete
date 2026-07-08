1. main.tsx 실행
2. AppProviders가 로그인 상태를 준비
3. App.tsx가 라우터 실행
4. router.tsx가 현재 주소를 확인
5. /login이면 로그인 페이지 표시
6. /main이면 로그인 여부 검사
7. 로그인 안 했으면 /login으로 보냄
8. 로그인 성공하면 토큰 저장
9. /main 페이지로 이동

main.tsx	React 앱 시작
App.tsx	라우터 실행
router.tsx	주소별 페이지 연결
providers.tsx	전역 기능 감싸기
AuthContext.tsx	로그인 상태 저장
useAuth.ts	로그인 상태 꺼내기
useLogin.ts	로그인 과정 처리
authApi.ts	로그인 API 요청
httpClient.ts	서버 요청 공통 설정
tokenStorage.ts	localStorage 저장/삭제
ProtectedRoute.tsx	로그인한 사람만 통과
LoginForm.tsx	로그인 입력 화면
LoginPage.tsx	로그인 페이지
MainLayout.tsx	로그인 후 화면 틀
MainPage.tsx	메인 페이지
Button.tsx	공통 버튼
Input.tsx	공통 입력창
LoadingSpinner.tsx	로딩 표시

설명 강의
https://www.youtube.com/watch?v=RuET5y-sfIk