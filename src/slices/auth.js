import { createSlice } from "@reduxjs/toolkit";
import { LocalStoreConnector } from "../tools/localStoreConnector";

const initialState = { isAuthenticated: false, access: null, refresh: null, userData: null }

const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            login(state, action) {
                LocalStoreConnector.setItem("access", action.payload.access)
                LocalStoreConnector.setItem("refresh", action.payload.refresh)
                return { ...state, isAuthenticated: true }
            },
            logout(state) {
                LocalStoreConnector.removeItem("access")
                LocalStoreConnector.removeItem("refresh")
                return initialState
            },
            userData(state, action) {
                return { ...state, userData: action.payload.userData }
            },

        }
    }
)

export const { login, logout, userData } = authSlice.actions
export default authSlice.reducer