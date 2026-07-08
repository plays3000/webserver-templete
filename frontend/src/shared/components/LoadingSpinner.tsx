type LoadingSpinnerSize = 'small' | 'medium' | 'large';

type LoadingSpinnerProps = {
    size?: LoadingSpinnerSize; 
};

export function LoadingSpinner({size='medium'}: LoadingSpinnerProps) {
    return (
        <span 
            className={`loading-spinner loading-spinner--${size}`}
            aria-label='로딩 중'
        />
    );
};