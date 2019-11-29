import {PageState} from "../reducers/pageState";

export enum PageStateActionTypes {
    SET = 'PAGE_STATE.SET'
}

export type PageStateActions = {
    SET: {
        type: typeof PageStateActionTypes.SET,
        key: keyof PageState,
        data: any
    }
};

export const setPageState = (key: keyof PageState,data:any):PageStateActions['SET'] => ({
    type: PageStateActionTypes.SET,
    key,
    data
});

export const selectUser = (id:number | null):PageStateActions['SET'] => {
    // id ? setHash({user:id}) : setHash();
    return setPageState('selectedUser',id);
};

export type IPageStateActions = PageStateActions[keyof  PageStateActions]