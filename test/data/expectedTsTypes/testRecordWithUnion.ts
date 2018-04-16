export interface User {
    id: number;
    username: string;
    passwordHash: string;
    signupDate: number;
    unionType?: null | string;
}
