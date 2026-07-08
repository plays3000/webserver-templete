// ReactNode는 React에서 화면에 렌더링할 수 있는 거의 모든 것
import type {ReactNode} from 'react';

// AuthProvider는 로그인 정보를 앱 전체에서 사용할 수 있게 해주는 컴포넌트
import {AuthProvider} from '@/features/auth/contexts/AuthContext';

import {setAccessTokenGetter} from '@/shared/api/httpClient';
import {getAccessToken} from '@/features/auth/utils/tokenStorage';

setAccessTokenGetter(getAccessToken);

type AppProvidersProps = {
    children: ReactNode;
};

export function AppProviders({children} : AppProvidersProps){
    return <AuthProvider>{children}</AuthProvider>
};