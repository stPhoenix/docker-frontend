const proceed_api_call = (api_response, setState, addAlert, page) => {
    if (api_response.result) {
        const regex = /(?<=page=)\d+/gm;
        let found_prev = api_response.data.previous != null ? api_response.data.previous.match(regex) : null
        let found_next = api_response.data.next != null ? api_response.data.next.match(regex) : null
        let previous = found_prev ? found_prev[0] : null
        let next = found_next ? found_next[0] : null
        previous = page == "2" ? "1" : previous

        setState({ fetched_list: api_response.data.results, next, previous })
    }
    else {
        addAlert({ variant: "danger", text: api_response.message })
    }
}


export const fetch_data_page = (setState, apiCall, page, addAlert) => {
    apiCall({ page })
        .then((api_response) =>
        (
            proceed_api_call(api_response, setState, addAlert, page)
        ))
}

export const fetch_id_data_page = (setState, apiCall, page, id, addAlert) => {
    apiCall(id, { page })
        .then((api_response) =>
        (
            proceed_api_call(api_response, setState, addAlert, page)
        ))
}