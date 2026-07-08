import type {ReactNode} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {ROUTES} from '@/shared/constants/routes';
import {useAuth} from '../hooks/useAuth';

type ProtectedRouteProps = {
    children: ReactNode;
};

export function ProtectedRoute({children}: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Navigate
                to={ROUTES.LOGIN}
                replace
                state={{
                from: location.pathname,
                }}
            />
        );
    }

    return children;
}