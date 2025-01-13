import { INCIDENT_ACTION_LOADING, INCIDENT_ACTION_SUCCESS, INCIDENT_ACTION_ERROR } from "../types";

const initialState = {
    loading: false,
};

export const incidentACtionReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case INCIDENT_ACTION_SUCCESS: {
            return {
                ...state,
                loading: false,
            }
        }
        case INCIDENT_ACTION_LOADING: {
            return {
                ...state,
                loading: true,
            };
        }
        case INCIDENT_ACTION_ERROR: {
            return {
                ...state,
                loading: false,
            };
        }
        default: {
            return state
        }
    }
}