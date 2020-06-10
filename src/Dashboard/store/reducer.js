/**
 * Import action types here
 */
import { 
    SET_BRANCHES,
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

export default reducer