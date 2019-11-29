import {Dispatch, Middleware} from "redux";
import {RootActions} from "../actions";
import {PageStateActionTypes} from "../actions/pageState";
import {setHash} from "../utils";

export const hashRouter:Middleware = () => (next:Dispatch) => (action:RootActions) => {
    next(action);
    if(action.type === PageStateActionTypes.SET && action.key === "selectedUser"){
        action.data ? setHash({user:action.data}) : setHash();
    }
};