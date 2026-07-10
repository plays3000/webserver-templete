import type {ReactNode} from 'react';
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
