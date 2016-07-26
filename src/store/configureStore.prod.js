/**
 * Created by krinjadl on 2016-07-14.
 */
import { createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));
}