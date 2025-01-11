import { INCIDENT_ATTEND_LIST, INCIDENT_ATTEND_LIST_ERROR, INCIDENTS_ERROR, INCIDENTS_LOADING, INCIDENTS_SUCCESS } from "../types";

const initialState = {
    isLoading: true,
    incidentsData: [],
    attendedListData: []
}

export const incidentReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case INCIDENTS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                incidentsData: action.payload
            }
        }
        case INCIDENTS_LOADING: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case INCIDENTS_ERROR: {
            return {
                ...state,
                isLoading: false,
                incidentsData: []
            }
        }
        case INCIDENT_ATTEND_LIST: {
            return {
                ...state,
                isLoading: false,
                attendedListData: action.payload
            }
        }
        case INCIDENT_ATTEND_LIST_ERROR: {
            return {
                ...state,
                isLoading: false,
                attendedListData: []
            }
        }
        default: {
            return state;
        }
    }
}