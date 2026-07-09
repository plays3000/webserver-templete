import {createBrowserRouter, Navigate} from 'react-router-dom';
import {ROUTES} from '@/shared/constants/routes';
import {LoginPage} from '@/pages/LoginPage';
import {MainPage} from '@/pages/MainPage';
import {NotFoundPage} from '@/pages/NotFoundPage';
import {SignupPage} from '@/pages/SignupPage';

import {AuthLayout} from '@/layouts/AuthLayout';
import {MainLayout} from '@/layouts/MainLayout';
import {ProtectedRoute} from '@/features/auth/components/ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <Navigate to={ROUTES.MAIN} replace/>
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: ROUTES.LOGIN,
                element: <LoginPage />
            },
        ],
    },
    {
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: ROUTES.MAIN,
                element: <MainPage />,
            }
        ]
    },
    {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
    },
    {
        path: ROUTES.SIGNUP,
        element: <SignupPage />
    }
]);