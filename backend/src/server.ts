import {app} from './app';
import {env} from './config/env';
import {connectDatabase} from './config/database';
import {createDefaultUsers} from './services/userSeedService';

async function bootstrap(){
    await connectDatabase();
    await createDefaultUsers();

    app.listen(env.port, () => {
        console.log(`서버 실행 중: http://localhost:${env.port}`);
        console.log(`health Check: http://localhost:${env.port}/health`);
    });
}

bootstrap().catch((error) => {
    console.error('서버 실행 실패: ', error);
    process.exit(1);
})