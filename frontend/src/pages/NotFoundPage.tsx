import {Link} from 'react-router-dom';
import {ROUTES} from '@/shared/constants/routes';

export function NotFoundPage(){
    return (
        <main className="no-found-page">
            <h1>404</h1>
            <p>페이지를 찾을 수 없습니다.</p>
            <Link to={ROUTES.MAIN}>메인페이지로 이동</Link>
        </main>
    )
}