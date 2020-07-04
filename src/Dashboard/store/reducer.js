/**
 * Import action types here
 */
import { 
    SET_BRANCHES,
    ADD_BRANCH,
    SET_CLUBS,
    DELETE_CLUB,
    DELETE_CCOMPANY,
    SET_CCOMPANY,
    SET_VENDOR,
    DELETE_VENDOR,
    SET_ALERT,
    SET_OFFER,
    DELETE_OFFER,
    DELETE_ALERT,
    SET_ALL_VENDOR,
    SET_ALL_CLUB,
    DELETE_ALL_CLUB,
    DELETE_ALL_VENDOR,
    TOTAL_COMPANY,
    TOTAL_VENDOR,
    TOTAL_CLUB,
} from "./action-types";

/**
 * Module internal initial state
 */
const initialState = {
    branchesList: [],
    clubsList: [],
    CompanyList: [],
    vendorList: [],
    allVendorList: [],
    allClubList: [],
    alertList: [],
    offerList: [],
    totalCompany : 0,
    totalClub: 0,
    totalVendor : 0,
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
        case TOTAL_COMPANY: 
            return setTotalCompany(state, payload)
        case TOTAL_CLUB: 
            return setTotalClub(state, payload)
        case TOTAL_VENDOR: 
            return setTotalVendor(state, payload)
        case SET_CLUBS: 
            return setClubsList(state, payload)
        case SET_CCOMPANY: 
            return setCompanyList(state, payload)
        case SET_ALERT: 
            return setAlertList(state, payload)
        case SET_OFFER: 
            return setOfferList(state, payload)
        case SET_ALL_VENDOR: 
            return setAllVendorList(state, payload)
        case SET_ALL_CLUB: 
            return setallClubList(state, payload)
        case DELETE_ALL_VENDOR: 
            return deleteAllVendorList(state, payload)
        case DELETE_ALL_CLUB: 
            return deleteAllClubList(state, payload)
        case DELETE_CLUB: 
            return deleteClub(state, payload)
        case SET_VENDOR: 
            return setVendorList(state, payload)
        case DELETE_VENDOR: 
            return deleteVendor(state, payload)
        case DELETE_CCOMPANY: 
            return deleteCompany(state, payload)
        case DELETE_OFFER: 
            return deleteOffer(state, payload)
        case DELETE_ALERT: 
            return deleteAlert(state, payload)
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

function setCompanyList(state, payload){
    return {
        ...state, CompanyList: payload
    }
}

function setOfferList(state, payload){
    return {
        ...state, offerList: payload
    }
}

function setAllVendorList(state, payload){
    return {
        ...state, allVendorList: payload
    }
}

function setTotalVendor(state, payload){
    return {
        ...state, totalVendor: payload
    }
}

function setTotalCompany(state, payload){
    return {
        ...state, totalCompany: payload
    }
}

function setTotalClub(state, payload){
    return {
        ...state, totalClub: payload
    }
}

function setallClubList(state, payload){
    return {
        ...state, allClubList: payload
    }
}

function setAlertList(state, payload){
    return {
        ...state, alertList: payload
    }
}

function deleteClub(state, payload){
    return {
        ...state, clubsList: [...state.clubsList].filter(club => club.Id !== payload)
    }
}

function deleteAllVendorList(state, payload){
    return {
        ...state, allVendorList: [...state.allVendorList].filter(vendor => vendor.Id !== payload)
    }
}

function deleteAllClubList(state, payload){
    return {
        ...state, allClubList: [...state.allClubList].filter(club => club.Id !== payload)
    }
}

function deleteOffer(state, payload){
    return {
        ...state, offerList: [...state.offerList].filter(offer => offer.Id !== payload)
    }
}

function deleteAlert(state, payload){
    return {
        ...state, alertList: [...state.alertList].filter(alert => alert.Id !== payload)
    }
}

function setVendorList(state, payload){
    return {
        ...state, vendorList: payload
    }
}

function deleteVendor(state, payload){
    return {
        ...state, vendorList: [...state.vendorList].filter(club => club.Id !== payload)
    }
}

function deleteCompany(state, payload){
    return {
        ...state, CompanyList: [...state.CompanyList].filter(company => company.Id !== payload)
    }
}

function addBranch(state, payload){
    console.log(payload) 
    return {
        ...state, branchesList: [payload, ...state.branchesList]
    }
}

export default reducer