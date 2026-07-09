import {Navigate} from 'react-router-dom';
import {SignupForm} from '@/features/auth/components/SignupForm';
import {useAuth} from '@/features/auth/hooks/useAuth';
import {ROUTES} from '@/shared/constants/routes';

export function SignupPage(){
    const {isAuthenticated} = useAuth();
    
    if (isAuthenticated){
        return <Navigate to={ROUTES.MAIN} replace />
    }

    return <SignupForm />;
}