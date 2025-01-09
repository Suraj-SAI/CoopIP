import { LOGIN_SUCCESS, USER_DATA } from "../types";

const initialState = {
    isLoggedIn: false,
    userData: []
};

export const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true
            }
        }
        case USER_DATA: {
            return {
                ...state,
                userData: action.payload
            }
        }
        default: {
            return state
        }
    }
}