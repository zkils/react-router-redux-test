/** @module asyncAction creator */
import * as types from './actionTypes/asyncActionTypes';

/**
 * Action creator for startFetchPlayers
 */
export function startFetchPlayers(){
    return{
        type: types.START_FETCH_PLAYERS
    };
}
/**
 * Action for successFetchPlayers
 * @param result
 * @returns {{type, result: *}}
 */
export function successFetchPlayers(result){
    return{
        type: types.SUCCESS_FETCH_PLAYERS,
        players : result
    };
}
/**
 * Action for errorFetchPlayers
 */
export function errorFetchPlayers(){
    return{
        type: types.ERROR_FETCH_PLAYERS
    }
}
/**
 * fetchPlayersAsync action
 * Async action for get Players list
 * @returns {Function}
 */
export function fetchPlayersAsync(){
    return dispatch => {
        dispatch(startFetchPlayers());
        return fetch('/conf.json')
        //return fetch('/api/players', {
        //     method:"POST",
        //     headers:{ "Content-Type": "application/x-www-form-urlencoded" } , body: "firstName=Nikhil&favColor=blue&password=easytoguess"
        // })
            .then(res => {
               if(res.ok){
                   res.json().then(data => dispatch(successFetchPlayers(data)));
               } else if(res.status == 401){
                   dispatch(errorFetchPlayers());
               }
            });
    }
}