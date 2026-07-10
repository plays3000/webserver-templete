import { useContext, useState, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../contexts/authContext';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { ROUTES } from '@/shared/constants/routes';

export function DeleteAccountForm() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmText, setConfirmText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!auth){
        throw new Error('DeleteAccountForm은 AuthProvider 내부에서만 사용할 수 있습니다.');
    }

    const {user, deleteAccount} = auth;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage('');
        
        if (!user){
            setErrorMessage('로그인이 필요합니다.');
            return;
        }
        if (!password){
            setErrorMessage('비밀번호를 입력해주세요');
            return;
        }
        if (confirmText !== 'DELETE'){
            setErrorMessage('회원 탈퇴를 진행하려면 DELETE를 입력해주세요.');
            return;
        }
        const confirmed = window.confirm('정말 회원 탈퇴를 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다.');

        if (!confirmed){
            return;
        }

        try {
            setIsSubmitting(true);
            await deleteAccount({
                password,
                confirmText,
            });

            alert('회원 탈퇴가 완료되었습니다.');
            navigate(ROUTES.LOGIN, {replace: true});
        }
        catch (error: unknown){
            const message = isAxiosError<{message?: string}>(error)
                ? error.response?.data?.message ?? '회원 탈퇴 중 오류가 발생했습니다.'
                : '회원 탈퇴 중 오류가 발생했습니다.';
            setErrorMessage(message);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="dashboard-card">
            <div className="page-title">
                <h1>회원 탈퇴</h1>
                <p>
                    현재 로그인한 계정: <strong>{user?.email}</strong>
                </p>
            </div>

            <p style={{color: '#dc2626'}}>
                회원 탈퇴를 진행하면 계정 정보가 삭제됩니다.
            </p>

            <form className="login-form__fields" onSubmit={handleSubmit}>
                <Input
                    id='password'
                    label='비밀번호 확인'
                    type='password'
                    value={password}
                    placeholder='현재 비밀번호를 입력하세요'
                    onChange={(event)=> setPassword(event.target.value)}
                    autoComplete='current-password'
                />
                <Input
                    id='confirmText'
                    label='삭제 확인'
                    type='text'
                    value={confirmText}
                    placeholder='DELETE를 입력하세요'
                    onChange={(event)=> setConfirmText(event.target.value)}
                    autoComplete='off'
                />

                {errorMessage && (
                    <div className='error-message'>
                        {errorMessage}
                    </div>
                )}

                <Button type='submit' variant='danger' disabled={isSubmitting}>
                    {isSubmitting ? '회원 탈퇴 중...' : '회원 탈퇴'}
                </Button>
            </form>    
        </div>
    );
}
