import * as React from "react";
import * as renderer from "react-test-renderer"
import User from "./User";
import {createStore, applyMiddleware} from "redux";
import {rootReducer} from "../reducers";
import {hashRouter} from "../middleware/hashRouter";
import userStorage from "../middleware/userStorage";
import { Provider } from "react-redux";

describe('User', () => {
    const store = createStore(rootReducer, applyMiddleware(hashRouter, userStorage));
    it('should render snapshot', function () {
        const component = renderer.create(
            <Provider store={store}>
                <User name={"Test"} email={"test@email.com"} phone={"+3621854549"} id={1}/>
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});