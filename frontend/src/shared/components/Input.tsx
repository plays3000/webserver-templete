import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    errorMessage?: string;
};

export function Input({
    id,
    label,
    errorMessage,
    className='',
    ...props
}: InputProps){
    return (
        <div className="input-field">
            {label && (
                <label className="input-field__label" htmlFor={id}>
                    {label}
                </label>
            )}

            <input 
                id={id}
                className={['input-field__input', className].filter(Boolean).join(' ')}
                {...props}
            />

            {errorMessage && (
                <p className="input-field__error">{errorMessage}</p>
            )}
        </div>
    );
};