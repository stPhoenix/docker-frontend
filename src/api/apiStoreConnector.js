import store from '../store'

export const TokensExpired = () => (store.dispatch({type: "auth/logout"}))