import {
    SET_BRANCHES,
} from './action-types'


export function setBranchesList(payload) {
    return {
        type: SET_BRANCHES,
        payload
    }
}
