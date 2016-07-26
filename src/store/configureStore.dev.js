/**
 * Created by krinjadl on 2016-07-14.
 */
import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
    const logger = createLogger();
    const store = createStore(rootReducer, initialState, compose(
        // Add other middleware on this line...
        applyMiddleware(thunkMiddleware , logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}