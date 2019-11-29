import {rootReducer} from "../reducers";
import { applyMiddleware, createStore } from "redux";
import {hashRouter} from "./hashRouter";
import {PageStateActionTypes} from "../actions/pageState";

describe("hashRouter",() => {
    it('should be able to switch route when selectedUser change', function () {
        const store = createStore(rootReducer,applyMiddleware(hashRouter));
        store.dispatch({type:PageStateActionTypes.SET,key:'selectedUser',data:1});
        expect(window.location.hash).toBe("#user=1")
    });
});