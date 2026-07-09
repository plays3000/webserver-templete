import dotenv from 'dotenv';

dotenv.config();

export type JwtExpiresIn = '1h'|'12h'|'1d'|'7d'|'30d'

function requiredEnv(key: string): string {
    const value = process.env[key];

    if (!value){
        throw new Error(`환경변수 ${key}가 설정되어 있지 않습니다.`);
    }
    return value;
}

function numberEnv(key: string, defaultValue: number) : number {
    const value = process.env[key];

    if (!value) {
        return defaultValue;
    }

    const parsed = Number(value);

    if (Number.isNaN(parsed)){
        throw new Error(`환경변수 ${key}는 숫자여야 합니다.`);
    }

    return parsed;
}

function jwtExpiresInEnv(): JwtExpiresIn{
    const value = process.env.JWT_EXPIRES_IN ?? '1d';
    const allowedValues: JwtExpiresIn[] = ['1h','12h','1d','7d','30d'];
    if (!allowedValues.includes(value as JwtExpiresIn)){
        throw new Error(
            `JWT_EXPIRES_IN은 ${allowedValues.join(', ')} 중 하나여야 합니다.`
        )
    }
    return value as JwtExpiresIn
};

export const env = {
    port: numberEnv('PORT', 4793),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    mongoUrl: requiredEnv('MONGODB_URL'),
    jwtSecret: requiredEnv('JWT_SECRET'),
    jwtExpiresIn: jwtExpiresInEnv(),
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    bcryptSaltRounds: numberEnv('BCRYPT_SALT_ROUNDS', 10),
    createDefaultUsers: process.env.CREATE_DEFAULT_USERS === 'true'
};
