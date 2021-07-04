import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, access: null, refresh: null, userData: null }

const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            login(state, action) {
                return { isAuthenticated: true, access: action.payload.access, refresh: action.payload.refresh }
            },
            logout(state) {
                return initialState
            },
            userData(state, action) {
                return { ...state, userData: action.payload.userData }
            }

        }
    }
)

export const { login, logout, userData } = authSlice.actions
export default authSlice.reducer