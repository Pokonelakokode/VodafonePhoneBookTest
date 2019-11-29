import {User} from "../types";

export enum UserActionTypes {
    LOAD = 'USERS.LOAD',
    SET = 'USERS.SET',
    ADD = 'USERS.ADD',
    DELETE = 'USERS.DELETE'
}

export type UserActions = {
    LOAD: {
        type: typeof UserActionTypes.LOAD
        users: User[]
    },
    SET: {
        type: typeof UserActionTypes.SET
        user: User
    },
    ADD: {
        type: typeof UserActionTypes.ADD,
        user: User
    },
    DELETE: {
        type: typeof UserActionTypes.DELETE,
        id: number
    }
}

export const saveUser = (user: User):UserActions['SET'] => {
    return {
        type: UserActionTypes.SET,
        user
    };
};

export const addUser = (user: User):UserActions['ADD'] => {
    return {
        type: UserActionTypes.ADD,
        user
    };
};

export const deleteUser = (id:number):UserActions['DELETE'] => {
    return {
        type: UserActionTypes.DELETE,
        id
    };
};

export const initialUser: Partial<User> = {
    name: "",
    phone: "",
    email: "",
};

export const getUserOrNew = (users:User[]=[],id:number):[User,boolean] => {
    const user = users.find(user => user.id === id);
    return user ? [user,false] : [initialUser as User,true]
};


export type IUserActions = UserActions[keyof UserActions]