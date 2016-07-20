/*
 * Combine all reducer with routerReducer
 */
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import sampleReducer from './sampleReducer';
import {selectedReddit,postsByReddit} from './asyncReducer';


const rootReducer = combineReducers({
    sampleReducer,
    selectedReddit,
    postsByReddit,
    // add your reducer
    routing: routerReducer
});

export default rootReducer;


