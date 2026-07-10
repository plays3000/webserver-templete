// ReactNode는 React에서 화면에 렌더링할 수 있는 거의 모든 것
import type {ReactNode} from 'react';

// AuthProvider는 로그인 정보를 앱 전체에서 사용할 수 있게 해주는 컴포넌트
import {AuthProvider} from '@/features/auth/contexts/AuthContext';
// setAccessTokenGetter는 API 요청을 보낼 때 자동으로 JWT 토큰을 붙이기 위한 준비
// httpClient가 자동으로 토큰을 붙이도록 설정
import {setAccessTokenGetter} from '@/shared/api/httpClient';
// localStorage에 저장된 로그인 정보에서 accessToken만 꺼내는 함수
import {getAccessToken} from '@/features/auth/utils/tokenStorage';

setAccessTokenGetter(getAccessToken);

type AppProvidersProps = {
    children: ReactNode;
};

export function AppProviders({children} : AppProvidersProps){
    return <AuthProvider>{children}</AuthProvider>
};
