import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {IPageStateActions, PageStateActionTypes, selectUser, setPageState} from "./pageState";
import pageState from "../reducers/pageState";

describe('pageState actions',() => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore(pageState);
    const tests:[() => IPageStateActions ,IPageStateActions[]][] = [
        [() => setPageState("letterFilter", "TEST"),[{type:PageStateActionTypes.SET,key:"letterFilter",data:"TEST"}]],
        [() => selectUser(1),[{type: PageStateActionTypes.SET,key:'selectedUser',data: 1}]]
    ];
    beforeEach(() => {
        store.clearActions()
    });
    it.each(tests)('%# %p',(a,b) => {
        store.dispatch(a());
        expect(store.getActions()).toEqual(b)
    });
    it('should be able to SET', function () {
        store.dispatch(setPageState("letterFilter", "TEST"));
        expect(store.getActions()).toEqual([{type:PageStateActionTypes.SET,key:"letterFilter",data:"TEST"}])
    });
});
