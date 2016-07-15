
import { SAMPLELIST,UPDATECHECKED} from '../actions/actionTypes/actionTypes';
import initialState from './initialState';

export default (state = initialState.sample , action ) => {  //set default state
    switch (action.type){
        case SAMPLELIST:
            return Object.assign({}, state, {
                sampleList:state.sampleList.slice()
            });
        case UPDATECHECKED:
            return Object.assign({}, state, {
                checked:!state.checked
            });
        default:
            return state;
    }
};