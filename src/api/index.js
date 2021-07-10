import axios from 'axios'
import { TokensExpired } from './apiStoreConnector'
import { LocalStoreConnector } from "../tools/localStoreConnector";

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

const api_call = async (data, url, params, method) => {
    let api_response = { ...response_template };
    const access = LocalStoreConnector.getItem("access")
    const refresh = LocalStoreConnector.getItem("refresh")
    await axios.post("social/jwt/verify", {
        token: access
    }).then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));

    if (api_response.result) {
        await axios({ url, method, data: data, headers: { AUTHORIZATION: `JWT ${access}` }, params: params })
            .then((response) => (response_handler(api_response, response)))
            .catch((error) => (error_handler(api_response, error)));
    }
    else {
        await axios.post("social/jwt/refresh", {
            refresh: refresh
        }).then((response) => (response_handler(api_response, response)))
            .catch((error) => (error_handler(api_response, error)))

        if (api_response.result) {
            LocalStoreConnector.setItem("access", api_response.data.access)
            LocalStoreConnector.setItem("refresh", api_response.data.refresh)
            api_response = await api_call(data, url, params, method)
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
    let api_response = { ...response_template };
    const formData = new FormData()
    for (const [key, value] of Object.entries(props)) {
        formData.append(key, value)
    }
    await axios.post("/social/users/", formData, { headers: formData.getHeaders })
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

const empty = { id: null }
const empty_data = {}

export const get_user = () => (api_call(empty_data, "social/users/me", empty, "get"))
export const get_user_list = (params) => (api_call(empty_data, "social/users/", params, "get"))
export const get_my_subscriptions = (params) => (api_call(empty_data, "social/subscriptions/my/", params, "get"))
export const get_to_me_subscriptions = (params) => (api_call(empty_data, "social/subscriptions/to-me/", params, "get"))
export const get_posts = (params) => (api_call(empty_data, "blog/posts/", params, "get"))
export const get_user_posts = (id, params) => (api_call(empty_data, `blog/posts/user/${id}`, params, "get"))
export const get_my_posts = (params) => (api_call(empty_data, "blog/posts/my/", params, "get"))
export const get_comments = (id, params) => (api_call(empty_data, `blog/comments/post/${id}`, params, "get"))

export const send_subscription_request = (target) => (api_call({ target, status: "1" }, "social/subscriptions/my/", empty, "post"))
export const abort_sub_request = (id) => (api_call(empty_data, `social/subscriptions/my/${id}`, empty, "delete"))
export const proceed_sub_request = (id, data) => (api_call(data, `social/subscriptions/to-me/${id}/`, empty, "put"))