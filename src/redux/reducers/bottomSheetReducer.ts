import { BOTTOMATTENDEDSHEETCLOSE, BOTTOMATTENDEDSHEETOPEN, BOTTOMDISMISSSHEETCLOSED, BOTTOMDISMISSSHEETOPEN } from "../types";

const initialState = {
    attendedOpen: false,
    unAttendedOpen: false,
    theftid: ""
}

export const bottomeSheetReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case BOTTOMATTENDEDSHEETOPEN: {
            return {
                ...state,
                attendedOpen: true,
                theftid: action.payload
            }
        }
        case BOTTOMATTENDEDSHEETCLOSE: {
            return {
                ...state,
                attendedOpen: false
            }
        }
        case BOTTOMDISMISSSHEETOPEN: {
            return {
                ...state,
                unAttendedOpen: true,
                theftid: action.payload
            }
        }
        case BOTTOMDISMISSSHEETCLOSED: {
            return {
                ...state,
                unAttendedOpen: false
            }
        }
        default: {
            return state;
        }
    }
}