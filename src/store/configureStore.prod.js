/**
 * Created by krinjadl on 2016-07-14.
 */
import {createStore} from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState);
}