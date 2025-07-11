// import { ObjectId } from "mongodb";

export type GetUserWithParamsRequestType = {
    id: string
}

export type CreatUserRequestType = {
    login: string,
    email: string,
    password: string
}

export type UserType = {
    userName: string,
    email: string,
    passwordHash: string,
    createdAt: number
}

// export type UserViewModel = {
//     userName: string,
//     email: string,
//     createdAt: string
// }

