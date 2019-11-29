import * as React from "react";
import * as renderer from "react-test-renderer"
import {createStore, applyMiddleware} from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";
import { hashRouter } from "../../middleware/hashRouter";
import { userStorage } from "../../middleware/userStorage";
import Edit from "./Edit";
import { mount } from "enzyme";
import {saveToStorage} from "../../utils";
import {testUser} from "../../testData";

describe("Edit",() => {
    saveToStorage(testUser);
    const store = createStore(rootReducer, applyMiddleware(hashRouter, userStorage));

    it('should render snapshot', function () {
        const component = renderer.create(
            <Provider store={store}>
                <Edit selectedUser={1}/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    it('should be able to set edit and save', function () {
        const wrapper = mount(
            <Provider store={store}>
                <Edit selectedUser={1}/>
            </Provider>
        );
        wrapper
            .find('button')
            .at(0)
            .simulate('click');
        expect(wrapper.find('button').at(0).text()).toBe("Cancel");
        wrapper
            .find('input')
            .at(0)
            .simulate('change',{target: {value: ""}});
        expect(wrapper.find('input').at(0).text()).toBe("");
        expect(wrapper.find('div.invalid-feedback').at(0).text()).toBe("Name is too short");
        wrapper
            .find('input')
            .at(0)
            .simulate('change',{target: {value: "TEST2"}});
        wrapper
            .find('input')
            .at(1)
            .simulate('change',{target: {value: "TEST2@email.com"}});
        wrapper
            .find('input')
            .at(2)
            .simulate('change',{target: {value: "1234567"}});
        wrapper
            .find('button')
            .at(2)
            .simulate('click');
        expect(store.getState().users.find(user => user.id === 1)).toStrictEqual({id:1,name:"TEST2",email:"TEST2@email.com",phone:"1234567"})
    });
    it('should be able to create new User and delete it', function () {
        window.confirm = jest.fn(() => true);
        const wrapper = mount(
            <Provider store={store}>
                <Edit selectedUser={-1}/>
            </Provider>
        );
        expect(wrapper.find('button').at(0).text()).toBe("Back");
        expect(wrapper.find('button').at(1).text()).toBe("Create");
        wrapper
            .find('input')
            .at(0)
            .simulate('change',{target: {value: "TEST3"}});
        wrapper
            .find('input')
            .at(1)
            .simulate('change',{target: {value: "TEST3@email.com"}});
        wrapper
            .find('input')
            .at(2)
            .simulate('change',{target: {value: "1234567"}});
        wrapper
            .find('button')
            .at(1)
            .simulate('click');
        expect(store.getState().users.find(user => user.id === 2)).toStrictEqual({id:2,name:"TEST3",email:"TEST3@email.com",phone:"1234567"});
        wrapper
            .find('button')
            .at(2)
            .simulate('click');
        expect(window.confirm).toBeCalled();
        expect(store.getState().users.length).toBe(1);
    });
    it('should nullify the selectedUser when Back button clicked', function () {
        const wrapper = mount(
            <Provider store={store}>
                <Edit selectedUser={-1}/>
            </Provider>
        );
        wrapper
            .find('button')
            .at(0)
            .simulate('click');
        expect(store.getState().pageState.selectedUser).toBe(null);
    });
});