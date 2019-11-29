import * as React from "react";
import * as renderer from "react-test-renderer"
import {createStore, applyMiddleware} from "redux";
import {rootReducer} from "../reducers";
import {hashRouter} from "../middleware/hashRouter";
import userStorage from "../middleware/userStorage";
import { Provider } from "react-redux";
import Logo from "./Logo";

describe("Logo",() => {
    const store = createStore(rootReducer, applyMiddleware(hashRouter, userStorage));
    it('should render snapshot', function () {
        const component = renderer.create(
            <Provider store={store}>
                <Logo imgSrc="vodafone_logo.svg"/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});