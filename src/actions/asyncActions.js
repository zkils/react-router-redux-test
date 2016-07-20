/** @module asyncAction creator */
import * as types from './actionTypes/asyncActionTypes';

/**
 * Action creator for getting reddit
 * @param reddit
 * @returns {{type, reddit: *}}
 */
export function selectReddit(reddit){
    return{
        type: types.SELECT_REDDIT,
        reddit
    };
}
/**
 * refresh
 * @param reddit
 * @returns {{type, reddit: *}}
 */
export function invalidateReddit(reddit){
    return{
        type: types.INVALIDATE_REDDIT,
        reddit
    };
}
/**
 * requestPosts
 * @param reddit
 * @returns {{type: string, reddit: *}}
 */
export function requestPosts(reddit){
    return{
        type: types.REQUEST_POSTS,
        reddit
    }
}
/**
 * receivePosts
 * @param reddit
 * @param json
 * @returns {{type: string, reddit: *, posts: *, receiveAt: *}}
 */
export function receivePosts(reddit,json) {
    return{
        type: types.RECEIVE_POSTS,
        reddit,
        posts: json.data.children.map(child => child.data),
        receiveAt: Data.now()
    };
}