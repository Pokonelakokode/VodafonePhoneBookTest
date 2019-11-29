import * as React from "react";
import * as renderer from "react-test-renderer"
import {createStore, applyMiddleware} from "redux";
import {rootReducer} from "../reducers";
import {hashRouter} from "../middleware/hashRouter";
import userStorage from "../middleware/userStorage";
import { Provider } from "react-redux";
import NewUser from "./NewUser";

describe("NewUser",() => {
    const store = createStore(rootReducer, applyMiddleware(hashRouter, userStorage));
    it('should render snapshot', function () {
        const mock = jest.fn();
        const component = renderer.create(
            <Provider store={store}>
                <NewUser newUser={mock}/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});