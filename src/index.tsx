import * as React from 'react';
import "./styles.scss";
import {render} from 'react-dom';
import PhoneBook from "./components/PhoneBook";
import { createStore, applyMiddleware, compose} from 'redux';
import {rootReducer} from "./reducers";
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import userStorage from "./middleware/userStorage";
import {hashRouter} from "./middleware/hashRouter";
const composeEnhancers = process.env.NODE_ENV === "production" ? compose : (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk,userStorage,hashRouter)));
render(
    <Provider store={store}>
        <PhoneBook/>
    </Provider>,
    document.getElementById('app'),
);