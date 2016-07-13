/**
 * Created by krinjadl on 2016-07-01.
 */

/** Action Type **/
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_DIFF = 'SET_DIFF';

export const ADDMESSAGE = 'ADDMESSAGE';
export const UPDATEMESSAGESTATE = 'UPDATEMESSAGESTATE';
export const DELETEMSG = 'DELETEMSG';
export const ITEMSELECTED = 'ITEMSELECTED';

export const SAMPLELIST ='SAMPLELIST';
export const UPDATECHECKED ='UPDATECHECKED';

/** Action Creator **/

export function addMessage(){
    return{
        type:ADDMESSAGE,
    };
}
export function updateMessageState(message){
    return {
        type:UPDATEMESSAGESTATE,
        newMessage : message
    }
}
export function deleteMessage(index){
    return{
        type:DELETEMSG,
    };
}
export function itemSelected(index){
    return{
        type:ITEMSELECTED,
        selectedItemIndex : index,
    }
}


export function increment(n){
    return{
        type:INCREMENT,
        amount:n
    };
}
export function decrement(n){
    return{
        type:DECREMENT,
        amount:n
    };
}
export function setDiff(value){
    return{
        type:SET_DIFF,
        diff:value,
    };
}

export function sampleList(){
    return{
        type:SAMPLELIST,
    };
}
export function setCheckOption(){
    return{
        type:UPDATECHECKED,
    };
}

