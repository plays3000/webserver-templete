import { Link, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/shared/constants/routes';

export function MainLayout() {
  const { user, logout } = useAuth();

  const fullname = [user?.firstname, user?.lastname]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid #ddd',
        }}
      >
        <h1>My Service</h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span>{fullname || user?.username}</span>

          <Link
            to={ROUTES.DELETE_ACCOUNT}
            style={{
              color: '#c0392b',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            회원 탈퇴
          </Link>

          <button type="button" onClick={logout}>
            로그아웃
          </button>
        </div>
      </header>

      <Outlet />
    </div>
  );
}