import { createSlice } from "@reduxjs/toolkit";

const initialState = { alerts:[] } // alert = {variant:"success", text:"some text"}
let alertsCount = 0

const alertsSlice = createSlice(
    {
        name: "alerts",
        initialState,
        reducers: {
            del(state,) {
                const alerts = state.alerts.slice(1);
                return {...state, alerts};
            },
            add(state, action) {
                const key = "alert_"+alertsCount;
                alertsCount++;
                let a = {...action.payload, key};
                const als = [...state.alerts, a];
                return {...state, alerts:als};
            },

        }
    }
)

export const { del, add } = alertsSlice.actions
export default alertsSlice.reducer