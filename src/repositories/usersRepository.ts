import { client } from '../db/db';
import { settings } from "../settings";
import { ObjectId } from "mongodb";
import { UserType } from "../types/usersTypes";

const usersCollection
    = client.db(settings.DB_NAME).collection<UserType>('users');

export const usersRepository = {

    // async findAllUsers(): Promise<UserType[]> {
    async findAllUsers(): Promise<UserType[]> {
        const findUsers: UserType[] = await usersCollection.find({}).toArray();
        // return findUsers;
        // return (findUsers.map(getUserViewModel));
        return findUsers;
    },

    async findUserByUserId(userId: string): Promise<UserType | undefined> {
        const findUser: UserType | null = await usersCollection.findOne({ _id: new ObjectId(userId) });

        if (!findUser) return undefined;

        // return getUserViewModel(findUser);
        return findUser;

    },

    async createUser(newUser: UserType): Promise<boolean> {
        const result = await usersCollection.insertOne(newUser);

        if (!result.acknowledged) {
            return false;
        }
        return true;
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user =
            await usersCollection.findOne({ $or: [{ email: loginOrEmail }, { userName: loginOrEmail }] });

        return user;
    }
}

// const getUserViewModel = (dbUser: UserType): UserViewModel => {
//     return {
//         userName: dbUser.userName,
//         email: dbUser.email,
//         createdAt: new Date(dbUser.createdAt).toISOString()
//     }
// }