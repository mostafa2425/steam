import {
    SET_BRANCHES,
    ADD_BRANCH,
    SET_CLUBS,
    DELETE_CLUB,
    SET_CCOMPANY,
    DELETE_CCOMPANY,
    DELETE_OFFER,
    SET_VENDOR,
    SET_ALERT,
    SET_OFFER,
    DELETE_VENDOR,
    DELETE_ALERT,
    SET_ALL_VENDOR,
    SET_ALL_CLUB,
    DELETE_ALL_CLUB,
    DELETE_ALL_VENDOR,
    TOTAL_COMPANY,
    TOTAL_VENDOR,
    TOTAL_CLUB,
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

export function setCompanyList(payload) {
    return {
        type: SET_CCOMPANY,
        payload
    }
}

export function setVendorList(payload) {
    return {
        type: SET_VENDOR,
        payload
    }
}

export function setAlertList(payload) {
    return {
        type: SET_ALERT,
        payload
    }
}

export function setOfferList(payload) {
    return {
        type: SET_OFFER,
        payload
    }
}

export function setAllVendorList(payload) {
    return {
        type: SET_ALL_VENDOR,
        payload
    }
}

export function setAllClubList(payload) {
    return {
        type: SET_ALL_CLUB,
        payload
    }
}
export function deleteAllVendorList(payload) {
    return {
        type: DELETE_ALL_VENDOR,
        payload
    }
}

export function deleteAllClubList(payload) {
    return {
        type: DELETE_ALL_CLUB,
        payload
    }
}

export function DeleteClub(payload) {
    return {
        type: DELETE_CLUB,
        payload
    }
}

export function DeleteOffer(payload) {
    return {
        type: DELETE_OFFER,
        payload
    }
}

export function DeleteAlert(payload) {
    return {
        type: DELETE_ALERT,
        payload
    }
}

export function deleteVendor(payload) {
    return {
        type: DELETE_VENDOR,
        payload
    }
}

export function DeleteCompany(payload) {
    return {
        type: DELETE_CCOMPANY,
        payload
    }
}

export function addBranch(payload) {
    return {
        type: ADD_BRANCH,
        payload
    }
}

export function addTotalCompany(payload) {
    return {
        type: TOTAL_COMPANY,
        payload
    }
}

export function addTotalVendor(payload) {
    return {
        type: TOTAL_VENDOR,
        payload
    }
}

export function addTotalClub(payload) {
    return {
        type: TOTAL_CLUB,
        payload
    }
}
