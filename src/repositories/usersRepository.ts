import {client} from '../db/db';
import {settings} from "../settings";
import {ObjectId, Collection} from "mongodb";
import {UserType, UserViewModel} from "../types/usersTypes";

const usersCollection
    = client.db(settings.DB_NAME).collection<UserType>('users');

const getUserViewModel = (dbUser: UserType): UserViewModel => {
    return {
        userName: dbUser.userName,
        email: dbUser.email,
        createdAt: new Date(dbUser.createdAt).toString()
    }
}

export const usersRepository = {
    // async findAllUsers(): Promise<UserType[]> {
    async findAllUsers(): Promise<UserViewModel[]> {
        const findUsers: UserType[] = await usersCollection.find({}).toArray();
        // return findUsers;
        return (findUsers.map(getUserViewModel));
    },

    async findUserByUserId(userId: string): Promise<UserViewModel | undefined> {
        const findUser: UserType | null = await usersCollection.findOne({_id: new ObjectId(userId)});

        if (!findUser) return undefined;

        return getUserViewModel(findUser);
    },

    async createUser(newUser: UserType): Promise<boolean> {
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