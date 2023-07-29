export type LoginUser = {
    username: string,
    password: string,
    _id: string,
    __v: number
}

export interface IUser {
    token: string,
    user: LoginUser
}