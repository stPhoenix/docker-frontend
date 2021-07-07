import store from '../store'

export const TokensExpired = () => (store.dispatch({type: "auth/logout"}))
export const UpdateToken = (payload) => (store.dispatch({type: "auth/updateAccessToken", payload}))