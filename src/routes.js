import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, Foo, Bar } from './components';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/foo" component={Foo}/>
        <Route path="/bar" component={Bar}/>
    </Route>
)
//
//
// //  getComponents:(a, cb) => require.ensure([], require => {cb(null, require("pages/PageOne"));})
// const onEnterBar = (nextState) =>{
//     console.log("onEnter to " + nextState.location.pathname);
// }
// const onLeaveBar = () => {
//     console.log("onLeave Bar");
// }
// const onChangeBar = (nextState, replaceState) => {  //onleave,onenter랑 같이 못씀..
//     console.log("onChange Bar");
//     console.log(nextState);
//     console.log(replaceState);
// }