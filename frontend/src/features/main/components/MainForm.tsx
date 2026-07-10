import type {DashBoardProps, ManuGridProps} from '../types/mainTypes';


export function PageTitle(){
    return (
        <div className='page-title'>
            <h1>메인 페이지</h1>
            <p>로그인 성공 후 접근 가능한 페이지입니다.</p>
        </div>
    );
}

export function DashBoardCard({username, fullname, email, role}: DashBoardProps){
    return (
         <div className="dashboard-card">
            <h2>{username}님, 환영합니다.</h2>

            <dl className='user-info'>
                <div>
                    <dt>사용자 이름</dt>
                    <dd>{fullname}</dd>
                </div>
                <div>
                    <dt>아이디</dt>
                    <dd>{username}</dd>
                </div>
                <div>
                    <dt>이메일</dt>
                    <dd>{email}</dd>
                </div>
                <div>
                    <dt>권한</dt>
                    <dd>{role}</dd>
                </div>
            </dl>
        </div>
    );
}

export function ManuGrid({isModerator, isAdmin}: ManuGridProps){
    return (
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
    );
}