import { configureStore } from "@reduxjs/toolkit";
import { default as authReducer } from "./slices/auth";



const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})

export default store