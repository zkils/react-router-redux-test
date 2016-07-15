/**
 * Created by krinjadl on 2016-07-01.
 */

import * as types from './actionTypes/actionTypes';

/** Action Creator **/
export function sampleList(){
    return{
        type: types.SAMPLELIST,
    };
}
export function setCheckOption(){
    return{
        type: types.UPDATECHECKED,
    };
}

