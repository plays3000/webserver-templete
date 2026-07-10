import {useAuth} from '@/features/auth/hooks/useAuth';
import {
    PageTitle,
    DashBoardCard,
    ManuGrid
} from '@/features/main/components/MainForm';
export function MainPage() {
    const {user, isAdmin, isModerator} = useAuth();

    if (!user) return null;
    const username = user?.username;
    const email = user?.email;
    const lastname = user?.lastname;
    const firstname = user?.firstname;
    const fullname = `${firstname}${lastname}`;
    const role = user?.roles.join(', ');

   return (
    <section className='main-page'>
        <PageTitle />
        <DashBoardCard 
            username={username}
            fullname={fullname}
            email={email}
            role={role}
        />
        <ManuGrid 
            isAdmin={isAdmin} 
            isModerator={isModerator}
        />
    </section>
   );
}