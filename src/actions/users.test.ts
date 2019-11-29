import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import users from "../reducers/users";
import {
    UserActionTypes,
    IUserActions,
    saveUser,
    addUser,
    deleteUser,
    getUserOrNew,
    initialUser
} from "./users";
import { testUser } from "../testData";

const {LOAD,SET,ADD,DELETE} = UserActionTypes;

const mockStore = configureMockStore([thunk]);
const store = mockStore(users);
describe("users actions",() => {
    const tests:[IUserActions][] = [
        [{type:LOAD,users:testUser}],
        [{type:SET,user:testUser[0]}],
        [{type:ADD,user:testUser[0]}],
        [{type:DELETE,id:1}],
    ];
    beforeEach(() => {
        store.clearActions()
    });
    it.each(tests)("%o ACTION TEST",(action) => {
        store.dispatch(action);
        expect(store.getActions()).toStrictEqual([action]);
    });
});

describe("user action creators",() => {
    const tests:[()=>IUserActions,IUserActions][] = [
        [() => saveUser(testUser[0]),{type:SET,user:testUser[0]}],
        [() => addUser(testUser[0]),{type:ADD,user:testUser[0]}],
        [() => deleteUser(1),{type:DELETE,id:1}],
    ];
    beforeEach(() => {
        store.clearActions()
    });
    it.each(tests)("%s %o ACTION CREATOR TEST", (fun,action) => {
        store.dispatch(fun());
        expect(store.getActions()).toStrictEqual([action]);
    })
});
describe("getUserOrNew",() => {
    it('should give back an existing user if it finds one', function () {
        expect(getUserOrNew(testUser,1)).toStrictEqual([testUser[0],false])
    });
    it('should give back a new user if not found', function () {
        expect(getUserOrNew(testUser,3)).toStrictEqual([initialUser,true])
    });
});

