import {useAuth} from '@/features/auth/hooks/useAuth';

export function MainPage() {
    const {user, isAdmin, isModerator} = useAuth();

   return (
    <section className='main-page'>
        <div className='page-title'>
            <h1>메인 페이지</h1>
            <p>로그인 성공 후 접근 가능한 페이지입니다.</p>
        </div>

        <div className="dashboard-card">
            <h2>{user?.username}님, 환영합니다.</h2>

            <dl className='user-info'>
                <div>
                    <dt>사용자 ID</dt>
                    <dd>{user?.id}</dd>
                </div>
                <div>
                    <dt>아이디</dt>
                    <dd>{user?.username}</dd>
                </div>
                <div>
                    <dt>이메일</dt>
                    <dd>{user?.email}</dd>
                </div>
                <div>
                    <dt>권한</dt>
                    <dd>{user?.roles.join(', ')}</dd>
                </div>
            </dl>
        </div>
        <div className="menu-grid">
            <div className="menu-card">
                <h3>일반 사용자 메뉴</h3>
                <p>로그인한 모든 사용자가 볼 수 있는 영역입니다.</p>
            </div>
            {isModerator && (
                <div className="menu-card menu-card--moderator">
                    <h3>운영자 메뉴</h3>
                    <p>ROLE_MODERATOR 권한이 있는 사용자만 볼 수 있습니다.</p>
                </div> 
            )}
            {isAdmin && (
                <div>
                    <h3>관리자 메뉴</h3>
                    <p>ROLE_ADMIN 권한이 있는 사용자만 볼 수 있습니다.</p>
                </div>
            )}
        </div>
    </section>
   );
}