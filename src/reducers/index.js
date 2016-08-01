/*
 * Combine all reducer with routerReducer
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sampleReducer from './sampleReducer';
import { getPlayers,inProgress } from './asyncReducer';
import { intlReducer } from 'react-intl-redux';

const rootReducer = combineReducers({
    sampleReducer,
    getPlayers,
    inProgress,
    // add your reducer
    intl: intlReducer,
    routing: routerReducer
});

export default rootReducer;


