export interface Foo {
    label: string;
}

export interface User {
    id: number;
    username: string;
    passwordHash: string;
    signupDate: number;
    mapField: { [index: string]: Foo };
}
