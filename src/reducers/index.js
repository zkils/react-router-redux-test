/**
 * Created by krinjadl on 2016-07-01.
 */
import { INCREMENT,DECREMENT,SET_DIFF,ADDMESSAGE,UPDATEMESSAGESTATE,DELETEMSG,ITEMSELECTED, SAMPLELIST,UPDATECHECKED} from '../actions';
import { combineReducers } from 'redux';
import {syncHistoryWithStore, routerReducer } from 'react-router-redux';


const initialState = {
    messageList: [],
    newMessage:"",
    selectedItemIndex:null,
    value : 0,
    diff : 1,
    number : 1,
    checked:false,
    sampleList: [{name:"1",value:100},{name:"2",value:100},{name:"3",value:100},{name:"4",value:100},{name:"5",value:100},{name:"6",value:100},{name:"7",value:100},{name:"8",value:100},
        {name:"9",value:100},{name:"10",value:100}]
};

const msgReducer = (state = initialState , action ) => {  //set default state
    switch (action.type){
        case ADDMESSAGE:
            return Object.assign({}, state, {
                messageList:state.messageList.slice().concat(state.newMessage)
            });
        case UPDATEMESSAGESTATE:{
            return Object.assign({}, state, {
                newMessage: action.newMessage
            });
        }
        case DELETEMSG:
            let tmpArr = state.messageList.slice();
            tmpArr.splice(state.selectedItemIndex,1);
            return Object.assign({}, state, {
                messageList:tmpArr
            });
        case ITEMSELECTED:
            return Object.assign({}, state, {
                selectedItemIndex: action.selectedItemIndex
            });
        default:
            return state;
    }
};

const countReducer = (state = initialState , action ) => {  //set default state
    switch (action.type){
        case INCREMENT:
            return Object.assign({}, state, {
                value:state.value + state.diff,
                number:state.number + action.amount,
            });
        case DECREMENT:
            return Object.assign({}, state, {
                value:state.value - state.diff,
                number:state.number - action.amount,
            });
        case SET_DIFF:
            return Object.assign({}, state, {
                diff : action.diff
            });
        default:
            return state;
    }
};

const sampleReducer = (state = initialState , action ) => {  //set default state
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

// const extra = (state = {value : 'this_is_extra_reducer'}, action ) => {
//     switch (action.type){
//         default:
//             return state;
//     }
// };

const reduxTutorialApp = combineReducers({
    msgReducer,
    countReducer,
    sampleReducer,
    routing:routerReducer
});

export default reduxTutorialApp;





