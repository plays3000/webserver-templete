// src/layouts/MainLayout.tsx

import { Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function MainLayout() {
  const { user, logout } = useAuth();
  const fullname = [user?.firstname, user?.lastname].filter(Boolean).join(' ')

  return (
    <div className="main-layout">
      <header className="main-header">
        <div>
          <strong className="main-header__logo">My Service</strong>
        </div>

        <div className="main-header__user">
          <span>{fullname}</span>

          <button type="button" onClick={logout}>
            로그아웃
          </button>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}