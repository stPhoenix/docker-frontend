export const fetch_data_page = (setState, apiCall, tokens, page, addAlert) => {
    apiCall(tokens, {page})
    .then((api_response)=>{
        if (api_response.result)
        {
            const regex = /(?<=page=)\d+/gm;
            let found_prev = api_response.data.previous != null ? api_response.data.previous.match(regex) : null
            let found_next = api_response.data.next != null ? api_response.data.next.match(regex) : null
            let previous = found_prev ? found_prev[0] : null
            let next = found_next ? found_next[0] : null
            previous = next == "3" ? "1" : previous

            setState({fetched_list: api_response.data.results, next, previous})
        }
        else {
            addAlert({variant:"danger", text:api_response.message})
        }
    })

}