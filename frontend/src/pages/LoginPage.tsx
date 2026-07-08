import {Navigate} from 'react-router-dom';
import {LoginForm} from '@/features/auth/components/LoginForm';
import {useAuth} from '@/features/auth/hooks/useAuth';
import {ROUTES} from '@/shared/constants/routes';

export function LoginPage() {
    const {isAuthenticated} = useAuth();

    if (isAuthenticated) {
        return <Navigate to={ROUTES.MAIN} replace />;
    }
    return <LoginForm />;
}