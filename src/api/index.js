import axios from 'axios'
import { UpdateToken, TokensExpired } from './apiStoreConnector'

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const response_template = { result: false, message: "Bad", data: [] };

const error_handler = (api_response, error) => {
    console.debug(error)
    console.debug(error.response)
    api_response.result = false;
    if (error.response) {
        api_response.message = JSON.stringify(error.response.data).replace("\"", "").replace("{", "").replace("}", "").replace("[", "").replace("]", "").replace("'", "");
    } else {
        api_response.message = "Oops! Something went wrong..."
    }
};

const response_handler = (api_response, response) => {
    console.debug(response);
    api_response.result = true;
    api_response.message = response.statusText;
    api_response.data = response.data;
};

const api_call = async (data, tokens, url, params, method) => {
    let api_response = { ...response_template };
    await axios.post("social/jwt/verify", {
        token: tokens.access
    }).then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));

    if (api_response.result) {
        await axios({ url, method, data: data, headers: { AUTHORIZATION: `JWT ${tokens.access}` }, params: params })
            .then((response) => (response_handler(api_response, response)))
            .catch((error) => (error_handler(api_response, error)));
    }
    else {
        await axios.post("social/jwt/refresh", {
            refresh: tokens.refresh
        }).then((response) => (response_handler(api_response, response)))
            .catch((error) => (error_handler(api_response, error)))

        if (api_response.result) {
            UpdateToken({ access: api_response.data.access, refresh: tokens.refresh })
            api_response = await api_call(data, { access: api_response.data.access, refresh: tokens.refresh }, url, method)
        }
        else {
            TokensExpired()
        }
    }

    return api_response;
}

export const login = async (username, password) => {
    let api_response = { ...response_template };
    await axios.post("/social/jwt/create/", {
        username: username,
        password: password,
    }).then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

export const sign_up = async (props) => {
    let api_response = { ...response_template};
    const formData = new FormData()
    for (const [ key, value ] of Object.entries(props)) {
     formData.append(key,value)
    }
    await axios.post("/social/users/", formData, {headers: formData.getHeaders})
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

const empty = { id: null }

export const get_user = (tokens) => (api_call(empty, tokens, "social/users/me", empty, "get"))
export const get_user_list = (tokens, params) => (api_call(empty, tokens, "social/users/", params, "get"))
export const get_my_subscriptions = (tokens, params) => (api_call(empty, tokens, "social/subscriptions/my/", params, "get"))
export const get_to_me_subscriptions = (tokens, params) => (api_call(empty, tokens, "social/subscriptions/to-me/", params, "get"))

export const send_subscription_request = (tokens, target) => (api_call({target, status: "1"}, tokens, "social/subscriptions/my/", empty, "post"))
export const abort_sub_request = (tokens, id) => (api_call(empty, tokens, `social/subscriptions/my/${id}`, empty, "delete"))
export const proceed_sub_request = (tokens, id, data) => (api_call(data, tokens, `social/subscriptions/to-me/${id}/`,empty, "put"))