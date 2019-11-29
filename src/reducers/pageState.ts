import {IPageStateActions, PageStateActionTypes} from "../actions/pageState";
import {getHash} from "../utils";

export type PageState = {
    selectedUser: number | null,
    search: string,
    letterFilter: string
}

const initialState:PageState = {
    selectedUser: parseInt(getHash().user) || null,
    search: "",
    letterFilter: ""
};


export default function pageState(state = initialState, action: IPageStateActions) {
    switch (action.type) {
        case PageStateActionTypes.SET:
            return {...state,[action.key]:action.data};
        default:
            return state
    }
}

