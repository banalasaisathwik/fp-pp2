
interface UserInput{
    password: string;
    email: string;
}

interface User extends UserInput{
    id : number;
}

export type {UserInput, User}