// src/features/auth/hooks/useLogin.ts

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import { loginApi } from '../api/authApi';
import { useAuth } from './useAuth';

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      if (!username.trim()) {
        setErrorMessage('아이디를 입력해주세요.');
        return;
      }

      if (!password.trim()) {
        setErrorMessage('비밀번호를 입력해주세요.');
        return;
      }

      const user = await loginApi({
        username,
        password,
      });

      login(user);
      navigate(ROUTES.MAIN);
    } catch {
      setErrorMessage('아이디 또는 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitLogin,
    isLoading,
    errorMessage,
  };
}