import {
    SET_BRANCHES,
    ADD_BRANCH,
} from './action-types'


export function setBranchesList(payload) {
    return {
        type: SET_BRANCHES,
        payload
    }
}
export function addBranch(payload) {
    return {
        type: ADD_BRANCH,
        payload
    }
}
