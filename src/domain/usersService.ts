import bcrypt from 'bcryptjs';
import { usersRepository } from "../repositories/usersRepository";
import { UserType } from "../types/usersTypes";

export const usersService = {

    async findAllUsers(): Promise<UserType[]> {
        return usersRepository.findAllUsers();
    },

    async findUserByUserId(userId: string): Promise<UserType | undefined> {
        return usersRepository.findUserByUserId(userId);
    },

    async createUser(login: string, email: string, password: string) {
        const passwordHash = await this._generateHash(password);

        const newUser: UserType = {
            userName: login,
            email,
            passwordHash,
            createdAt: Date.now()
        }

        return usersRepository.createUser(newUser);
    },

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail);

        if (!user) {
            console.log('User not found');
            return false;
        } else {
            console.log('User found');
        }

        const passwordHash = user.passwordHash;
        const passwordIsValid = await this._verifyPassword(password, passwordHash);

        if (!passwordIsValid) {
            return false;
        } else {
            return user;
        }
    },

    async _generateHash(password: string) {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        return hash;
    },

    async _verifyPassword(password: string, passwordHash: string): Promise<boolean | undefined> {
        return new Promise((resolve) => {
            bcrypt.compare(password, passwordHash, (err, result) => {
                if (err) {
                    console.error('Error verifying password:', err);
                    resolve(false);
                } else {
                    console.log('Password match:', result);
                    resolve(result);
                }
            })
        })
    }
}