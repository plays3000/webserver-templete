// src/features/auth/components/LoginForm.tsx

import { useState, type FormEvent } from 'react';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { useLogin } from '../hooks/useLogin';

export function LoginForm() {
  const { submitLogin, isLoading, errorMessage } = useLogin();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitLogin(username, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__header">
        <h1>로그인</h1>
        <p>계정 정보를 입력해 주세요.</p>
      </div>

      <div className="login-form__fields">
        <Input
          id="username"
          label="아이디"
          type="text"
          placeholder="아이디를 입력하세요"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
        />

        <Input
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? (
          <span className="button-loading">
            <LoadingSpinner size="small" />
            로그인 중...
          </span>
        ) : (
          '로그인'
        )}
      </Button>
    </form>
  );
}