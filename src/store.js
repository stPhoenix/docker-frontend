import { configureStore } from "@reduxjs/toolkit";
import { default as authReducer } from "./slices/auth";
import {default as alertsReducer} from "./slices/alerts";



const store = configureStore({
    reducer: {
        auth: authReducer,
        alerts: alertsReducer,
    }
})

export default store