import {
    SET_BRANCHES,
    ADD_BRANCH,
    SET_CLUBS,
    DELETE_CLUB,
} from './action-types'


export function setBranchesList(payload) {
    return {
        type: SET_BRANCHES,
        payload
    }
}

export function setClubsList(payload) {
    return {
        type: SET_CLUBS,
        payload
    }
}

export function DeleteClub(payload) {
    return {
        type: DELETE_CLUB,
        payload
    }
}

export function addBranch(payload) {
    return {
        type: ADD_BRANCH,
        payload
    }
}
