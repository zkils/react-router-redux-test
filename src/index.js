import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory,store);

// Provider를 통해 store를 생성 주입 해준다.
ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);
