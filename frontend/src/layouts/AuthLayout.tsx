import {Outlet} from 'react-router-dom';

export function AuthLayout () {
    return (
        <div className='auth-layout'>
            <section className='auth-layout__panel'>
                <Outlet />
            </section>
        </div>
    );
}