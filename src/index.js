import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; 
import reduxTutorialApp from './reducers';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import {syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { App, Home, Foo, Bar } from './components';

const store = createStore(reduxTutorialApp, window.devToolsExtension && window.devToolsExtension());
const appElement = document.getElementById('root');
const history = syncHistoryWithStore(browserHistory,store);

const onEnterBar = (nextState) =>{
    console.log("onEnter to " + nextState.location.pathname);
}
const onLeaveBar = () => {
    console.log("onLeave Bar");
}
const onChangeBar = (nextState, replaceState) => {  //onleave,onenter랑 같이 못씀..
    console.log("onChange Bar");
    console.log(nextState);
    console.log(replaceState);
}

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="foo" component={Foo}/>
                    <Route path="bar" component={Bar} onEnter={onEnterBar} onLeave={onLeaveBar} onChange={onChangeBar}/>
                </Route>
            </Router>
        </div>
    </Provider>,
    appElement
);


