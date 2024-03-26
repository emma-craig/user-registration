import { createContext } from "react";

interface IUser {
    username: string
    email: string
    password: string
    id?: string
}

const UserContext = createContext<IUser[]>([])

export default UserContext