import {Schema, model, type InferSchemaType} from 'mongoose';
import {type UserRole} from '../types/authTypes';

const userRoles: UserRole[] = ['ROLE_USER', 'ROLE_MODERATOR','ROLE_ADMIN'];

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
            index: true
        },
        firstname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        lastname: {
            type : String,
            required: true, 
            index: true,
        },
        email : {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        passwordHash:{
            type: String,
            required: true,
        },
        roles:{
            type: [String],
            enum: userRoles,
            default: ['ROLE_USER'],
        },
    },
    {
        timestamps: true,
    },
);

export type UserDocument = InferSchemaType<typeof userSchema> & {
    _id: unknown;
};

export const UserModel = model('User', userSchema);