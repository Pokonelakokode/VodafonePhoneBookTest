import * as React from "react";
import * as renderer from "react-test-renderer"
import {createStore, applyMiddleware} from "redux";
import {rootReducer} from "../reducers";
import {hashRouter} from "../middleware/hashRouter";
import userStorage from "../middleware/userStorage";
import { Provider } from "react-redux";
import Letter from "./Letter";
import { mount } from "enzyme";

describe("Letter",() => {
    const store = createStore(rootReducer, applyMiddleware(hashRouter, userStorage));
    it('should render snapshot', function () {
        const mock = jest.fn();
        const component = renderer.create(
            <Provider store={store}>
                <Letter letter="A" selected={false} selectLetter={mock}/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    it('should change selectedLetter when it clicked', function () {
        const letter = "A";
        const mock = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <Letter letter={letter} selected={false} selectLetter={mock}/>
            </Provider>
        );
        wrapper
            .find('div')
            .simulate('click');
        expect(mock).toHaveBeenCalled();
    });
});