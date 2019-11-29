import { combineReducers } from "redux";
import pageState from "./pageState";
import users from "./users";

export const rootReducer = combineReducers({
    pageState,
    users
});

export type RootState = ReturnType<typeof rootReducer>