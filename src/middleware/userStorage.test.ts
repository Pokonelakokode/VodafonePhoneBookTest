import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "../reducers";
import userStorage from "./userStorage";
import {UserActionTypes} from "../actions/users";
import {testUser} from "../testData";
import {loadFromStorage} from "../utils";

describe("userStorage",() => {
    it('should be able to save to storage if user action occur', function () {
        const store = createStore(rootReducer,applyMiddleware(userStorage));
        store.dispatch({type:UserActionTypes.LOAD,users:[testUser]});
        expect(loadFromStorage()).toStrictEqual([testUser]);
    });
});