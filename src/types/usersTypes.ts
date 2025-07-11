import {ObjectId} from "mongodb";

export type CreateUserRequest = {
    login: string,
    email: string,
    password: string
}

export type CreateUserModel = {
    userName: string,
    email: string,
    passwordHash: string,
    createdAt: number
}

export type GetUserWithParamsRequest = {
    id: string
}



export type UserDBType = {
    _id: ObjectId,
    userName: string,
    email: string,
    passwordHash: string,
    createdAt: Date
}

export type UserViewModel = {
    userName: string,
    email: string,
    createdAt: string
}