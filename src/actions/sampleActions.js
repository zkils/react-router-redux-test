/**
 * Created by krinjadl on 2016-07-01.
 */

import * as types from './actionTypes/sampleActionTypes';
/** @module sampleaction creator */

/**
 * Action creator
 * @returns {{type}}
 */
export function sampleList(){
    return{
        type: types.SAMPLELIST,
    };
}

/**
 * Action creator
 * @returns {{type}}
 */
export function setCheckOption(){
    return{
        type: types.UPDATECHECKED,
    };
}

