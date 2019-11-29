import {Dispatch, Middleware, MiddlewareAPI} from "redux";
import {RootActions} from "../actions";
import {UserActionTypes} from "../actions/users";
import {saveToStorage} from "../utils";
import {RootState} from "../reducers";

export const userStorage:Middleware = (store: MiddlewareAPI<any,RootState>) => (next:Dispatch) => (action:RootActions) => {
    const {DELETE, ADD, SET} = UserActionTypes;
    next(action);
    if(action.type === DELETE || ADD || SET){
        saveToStorage(store.getState().users)
    }
};

export default userStorage