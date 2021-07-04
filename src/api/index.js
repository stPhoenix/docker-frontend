import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const response_template = { result: false, message: "Bad", data: [] };

const error_handler = (api_response, error) => {
    api_response.result = false;
    if (error.response) {
        api_response.message = JSON.stringify(error.response.data).replace("\"", "").replace("{", "").replace("}", "").replace("[", "").replace("]", "").replace("'", "");
    } else {
        api_response.message = "Oops! Something went wrong..."
        console.log(error)
    }
};

const response_handler = (api_response, response) => {
    console.debug(response);
    api_response.result = true;
    api_response.message = response.statusText;
    api_response.data = response.data;
};

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
    let api_response = { result: false, message: "Bad", data: [] };
    await axios.post("/social/users/", { ...props })
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};

export const get_user = async (token) => {
    let api_response = { ...response_template }
    await axios.get("/social/users/me", { headers: { AUTHORIZATION: `JWT ${token}` } })
        .then((response) => (response_handler(api_response, response)))
        .catch((error) => (error_handler(api_response, error)));
    return api_response;
};