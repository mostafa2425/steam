/**
 * Import action types here
 */
import { 
    SET_BRANCHES,
    ADD_BRANCH,
    SET_CLUBS,
    DELETE_CLUB,
} from "./action-types";

/**
 * Module internal initial state
 */
const initialState = {
    branchesList: [],
    clubsList: [],
};  


/**
 * Checks dispatched actions and updates state accordingly
 * @param {Object} state 
 * @param {Object} action 
 * @returns {Function} 
 */

const reducer = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case SET_BRANCHES: 
            return setBranchesList(state, payload)
        case SET_CLUBS: 
            return setClubsList(state, payload)
        case DELETE_CLUB: 
            return deleteClub(state, payload)
        case ADD_BRANCH: 
            return addBranch(state, payload)
        default:
            return state;
    }
} 

/**
 * Returns an updated version of the state based on the action
 * @param {Object} state 
 * @param {Object} payload 
 * @return {Object} state
 */

function setBranchesList(state, payload){
    return {
        ...state, branchesList: payload
    }
}

function setClubsList(state, payload){
    return {
        ...state, clubsList: payload
    }
}

function deleteClub(state, payload){
    return {
        ...state, clubsList: [...state.clubsList].filter(club => club.Id !== payload)
    }
}

function addBranch(state, payload){
    console.log(payload) 
    return {
        ...state, branchesList: [payload, ...state.branchesList]
    }
}

export default reducer