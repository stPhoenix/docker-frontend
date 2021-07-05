import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, access: null, refresh: null, userData: null }

const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            login(state, action) {
                return { ...state, isAuthenticated: true, access: action.payload.access, refresh: action.payload.refresh }
            },
            logout(state) {
                return initialState
            },
            userData(state, action) {
                return { ...state, userData: action.payload.userData }
            },
            updateAccessToken(state, action) {
                return { ...state, access: action.payload }
            }

        }
    }
)

export const { login, logout, userData, updateAccessToken } = authSlice.actions
export default authSlice.reducer