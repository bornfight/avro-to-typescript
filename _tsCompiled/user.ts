export interface EmailAddress {
    address: string;
    verified: boolean;
    dateAdded: number;
    dateBounced?: null | undefined | number;
}

export enum OAuthStatus {
    PENDING,
    ACTIVE,
    DENIED,
    EXPIRED,
    REVOKED,
}

export interface TwitterAccount {
    status: OAuthStatus;
    userId: number;
    screenName: string;
    oauthToken: string;
    oauthTokenSecret?: null | undefined | string;
    dateAuthorized: number;
}

export enum ToDoStatus {
    HIDDEN,
    ACTIONABLE,
    DONE,
    ARCHIVED,
    DELETED,
}

export interface ToDoItem {
    status: ToDoStatus;
    title: string;
    description?: null | undefined | string;
    snoozeDate?: null | undefined | number;
    subItems: any[];
}

export interface User {
    id: number;
    username: string;
    passwordHash: string;
    signupDate: number;
    emailAddresses: EmailAddress[];
    twitterAccounts: TwitterAccount[];
    toDoItems: ToDoItem[];
}
