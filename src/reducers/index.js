/*
 * Combine all reducer with routerReducer
 */
import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
    sampleReducer,
    // add your reducer
    routing: routerReducer
});

export default rootReducer;


