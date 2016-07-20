
import { SAMPLELIST,UPDATECHECKED} from '../actions/actionTypes/sampleActionTypes';
import initialState from './initialState';
/**
 * sample reducer module
 *
 * @module sampleReducer
 */

/**
 * handle actions ( SAMPLELIST,UPDATECHECKED)
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initialState.sample , action ) => {  //set default state
    switch (action.type){
        case SAMPLELIST:
            //return new samplelist array
            return Object.assign({}, state, {
                sampleList:state.sampleList.slice()
            });
        case UPDATECHECKED:
            //update checked state
            return Object.assign({}, state, {
                checked:!state.checked
            });
        default:
            return state;
    }
};