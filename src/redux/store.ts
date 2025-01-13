import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./reducers/loginReducer";
import { incidentReducer } from "./reducers/IncidentsReducer";
import { bottomeSheetReducer } from "./reducers/bottomSheetReducer";
import { incidentACtionReducer } from "./reducers/incidentActionReducer";

export const store = configureStore({
    reducer: {
        loginReducer,
        incidentReducer,
        bottomeSheetReducer,
        incidentACtionReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
})