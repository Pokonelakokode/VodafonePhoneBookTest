import * as React from "react";
import * as renderer from "react-test-renderer"
import {createStore, applyMiddleware} from "redux";
import {rootReducer} from "../reducers";
import {hashRouter} from "../middleware/hashRouter";
import userStorage from "../middleware/userStorage";
import { Provider } from "react-redux";
import PhoneBook from "./PhoneBook";
import {selectUser} from "../actions/pageState";
import { mount } from "enzyme";
import Edit from "./SelectedUser/Edit";


describe("PhoneBook",() => {
    const store = createStore(rootReducer, applyMiddleware(hashRouter, userStorage));
    it('should render snapshot', function () {
        const component = renderer.create(
            <Provider store={store}>
                <PhoneBook/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    it('should render with selectedUser', function () {
        store.dispatch(selectUser(1));
        const wrapper = mount(
            <Provider store={store}>
                <PhoneBook/>
            </Provider>
        );
        expect(wrapper.find(Edit).length).toBe(1);
    });
});