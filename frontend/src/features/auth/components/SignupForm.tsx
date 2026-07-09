import {useState, type FormEvent} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import {ROUTES} from '@/shared/constants/routes';
import {signupApi} from '../api/authApi';

export function SignupForm(){
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        try{
            setIsLoading(true);
            setErrorMessage(null);
            await signupApi({
                username,
                firstname,
                lastname,
                email,
                password
            });
            navigate(ROUTES.LOGIN)
        }
        catch{
            setErrorMessage('회원가입에 실패하였습니다.');
        }
        finally{
            setIsLoading(false);
        }
    };

    return (
        <form className="login-form signup-form" onSubmit={handleSubmit}>
            <div className="login-form__header">
                <h1>회원가입</h1>
                <p>계정 정보를 입력해주세요.</p>
            </div>

            <div className= "login-form__fields">
                <Input
                    id='username'
                    label='아이디'
                    type='text'
                    value={username}
                    onChange={(event)=>setUsername(event.target.value)}
                    autoComplete="username"
                />
                <Input
                    id='firstname'
                    label='이름'
                    type='text'
                    value={firstname}
                    onChange={(event)=>setFirstname(event.target.value)}
                    autoComplete="firstname"
                />
                <Input
                    id='lastname'
                    label='성'
                    type='text'
                    value={lastname}
                    onChange={(event)=>setLastname(event.target.value)}
                    autoComplete="lastname"
                />
                <Input
                    id='email'
                    label='이메일'
                    type='text'
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    autoComplete="email"
                />
                <Input
                    id='password'
                    label='비밀번호'
                    type='text'
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                    autoComplete="current-password"
                />
            </div>

            {errorMessage && <div className='error-message'>{errorMessage}</div>}
            <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? '가입 중...' : '회원가입'}
            </Button>
            <Link to={ROUTES.LOGIN} className='button button--secondary button--full'>
            로그인으로 돌아가기
            </Link>
        </form>
    );
}
