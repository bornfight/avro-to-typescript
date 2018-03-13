export interface EmailAddress {
    address: string;
    verified: boolean;
    dateAdded: number;
}

export interface User {
    id: number;
    username: string;
    passwordHash: string;
    signupDate: number;
    emailAddresses: EmailAddress[];
}
