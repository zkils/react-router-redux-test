/**
 * Created by krinjadl on 2016-07-19.
 */
import initialState from './initialState';
import { START_FETCH_PLAYERS, SUCCESS_FETCH_PLAYERS, ERROR_FETCH_PLAYERS} from '../actions/actionTypes/asyncActionTypes';


export function getPlayers(state = initialState.asyncSample, action){
    switch (action.type){
        case SUCCESS_FETCH_PLAYERS:
            return action.players;
        case ERROR_FETCH_PLAYERS:
            return [];
        default:
            return state;
    }
}

export function inProgress(state,action){
    state = state || false;
    switch (action.type){
        case START_FETCH_PLAYERS:
            return true;
        case SUCCESS_FETCH_PLAYERS:
            return false;
        case ERROR_FETCH_PLAYERS:
            return false;
        default:
            return state;
    }
}