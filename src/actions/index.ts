import {IPageStateActions} from "./pageState";
import {IUserActions} from "./users";
import {RootState} from "../reducers";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";

export type RootActions = IPageStateActions | IUserActions

export const mainSelector = (state:RootState) => state;

export type EThunkDispatch<A> = ThunkAction<void,RootState,null,Action<A>>