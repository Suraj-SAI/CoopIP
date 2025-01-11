import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./reducers/loginReducer";
import { incidentReducer } from "./reducers/IncidentsReducer"

export const store = configureStore({
    reducer: {
        loginReducer,
        incidentReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
})