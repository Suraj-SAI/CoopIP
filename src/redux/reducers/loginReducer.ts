import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../types";

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    userData: []
};

export const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                userData: action.payload
            }
        }
        case LOGIN_LOADING: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                isLoading: false,
                userData: []
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                isLoggedIn: false,
                userData: []
            }
        }
        default: {
            return state
        }
    }
}