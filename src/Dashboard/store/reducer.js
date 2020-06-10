/**
 * Import action types here
 */
import { 
    SET_BRANCHES,
    ADD_BRANCH,
} from "./action-types";

/**
 * Module internal initial state
 */
const initialState = {
    branchesList: [],
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
function addBranch(state, payload){
    console.log(payload) 
    return {
        ...state, branchesList: [payload, ...state.branchesList]
    }
}

export default reducer