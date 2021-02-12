import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import * as serviceWorker from './serviceWorker';
import attributeReducer from './store/reducer/attribute';
import bussinessObjectReducer from './store/reducer/businessObject';
import { watchAttributes, watchBusinessObjects } from './store/saga';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
    attribute: attributeReducer,
    bo:bussinessObjectReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAttributes);
sagaMiddleware.run(watchBusinessObjects);

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

defineCustomElements(window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
