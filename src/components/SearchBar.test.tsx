import * as React from "react";
import * as renderer from "react-test-renderer"
import {createStore, applyMiddleware} from "redux";
import {rootReducer} from "../reducers";
import {hashRouter} from "../middleware/hashRouter";
import userStorage from "../middleware/userStorage";
import { Provider } from "react-redux";
import SearchBar from "./SearchBar";


describe("SearchBar",() => {
    const store = createStore(rootReducer, applyMiddleware(hashRouter, userStorage));
    it('should render snapshot', function () {
        const component = renderer.create(
            <Provider store={store}>
                <SearchBar/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});