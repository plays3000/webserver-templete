import bcrypt from 'bcryptjs';
import {env} from '../config/env';
import {UserModel} from '../models/User';
import type {UserRole} from '../types/authTypes';

type SeedUser = {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: UserRole[];
};

const seedUsers: SeedUser[] = [
    {
        username: 'admin',
        firstname: 'gil-dong',
        lastname: 'hong',
        email: 'admin@admin.com',
        password: '123456',
        roles: ['ROLE_ADMIN']
    },
    {
        username: 'testuser',
        firstname: 'gil-dong',
        lastname: 'hong',
        email: 'test@example.com',
        password: '123456',
        roles:['ROLE_USER']
    }
];

export async function createDefaultUsers(){
    if (!env.createDefaultUsers){
        return;
    }
    for (const seedUser of seedUsers){
        const exists = await UserModel.exists({
            username: seedUser.username,
        });
        if (exists){
            continue;
        }
        const passwordHash = await bcrypt.hash(
            seedUser.password,
            env.bcryptSaltRounds,
        );

        await UserModel.create({
            username: seedUser.username,
            firstname: seedUser.firstname,
            lastname: seedUser.lastname,
            email: seedUser.email,
            passwordHash,
            roles: seedUser.roles
        });

        console.log(`기본 사용자 생성: ${seedUser.username}`)
    }
}