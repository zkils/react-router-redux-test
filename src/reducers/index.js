/*
 * Combine all reducer with routerReducer
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sampleReducer from './sampleReducer';
import { getPlayers,inProgress } from './asyncReducer';


const rootReducer = combineReducers({
    sampleReducer,
    getPlayers,
    inProgress,
    // add your reducer
    routing: routerReducer
});

export default rootReducer;


