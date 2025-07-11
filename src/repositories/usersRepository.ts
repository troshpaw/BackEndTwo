import {client} from '../db/db';
import {settings} from "../settings";
import {ObjectId} from "mongodb";
import {CreateUserModel, UserDBType, UserViewModel} from "../types/usersTypes";

const usersCollection = client.db(settings.DB_NAME).collection('users');

const getUserViewModel = (dbUser: UserDBType): UserViewModel => {
    return {
        userName: dbUser.userName,
        email: dbUser.email,
        createdAt: new Date(dbUser.createdAt).toString()
    }
}

export const usersRepository = {
    async findAllUsers(): Promise<UserViewModel[]> {
        const findUsers = await usersCollection.find({}).toArray();
        return (findUsers.map(getUserViewModel));
    },

    async findUserByUserId(userId: string) {
        return usersCollection.findOne({_id: new ObjectId(userId)});
    },

    async createUser(newUser: CreateUserModel) {
        const result = await usersCollection.insertOne(newUser);

        if (!result.acknowledged) {
            return false;
        }
        return true;
    },

    // async findByLoginOrEmail(loginOrEmail: string) {
    //     const user =
    //         await usersCollection.findOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]});
    //
    //     return user;
    // }
}