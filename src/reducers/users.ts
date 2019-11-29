import {IUserActions, UserActionTypes} from "../actions/users";
import { User } from "../types";
import {loadFromStorage} from "../utils";

export default function users(state = loadFromStorage(), action: IUserActions):User[] {
    switch (action.type) {
        case UserActionTypes.LOAD:
            return action.users;
        case UserActionTypes.SET:
            return state.map(user => user.id === action.user.id ? action.user : user);
        case UserActionTypes.ADD:
            return [...state,action.user];
        case UserActionTypes.DELETE:
            return state.filter(user => user.id !== action.id);
        default:
            return state
    }
}