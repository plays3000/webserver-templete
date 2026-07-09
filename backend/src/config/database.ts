import mongoose from 'mongoose';
import {env} from './env.js';

export async function connectDatabase(){
    try{
        await mongoose.connect(env.mongoUrl)
        console.log('MongoDB 얀결 성공');
    }
    catch(error){
        console.log('MongoDB 얀걀 실페: ', error);
        process.exit(1);
    }
}