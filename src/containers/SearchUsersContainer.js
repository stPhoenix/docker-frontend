import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search_user, send_subscription_request } from '../api'
import { add as addAlert } from "../slices/alerts";
import { SearchUsersComponent } from "../components/SearchUsersComponent";
import { fetch_id_data_page } from '../tools/fetch_data_page';

class SearchUsersContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetched_list: [],
            userName: "",
            next: null,
            previous: null
        }
        this.fetch_users = this.fetch_users.bind(this)
        this.setState = this.setState.bind(this)
        this.sendRequest = this.sendRequest.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.searchUsers = this.searchUsers.bind(this)
    }

    searchUsers(e)
    {
        e.preventDefault()
        this.fetch_users(1)
    }

    fetch_users(page) {
        fetch_id_data_page(this.setState, search_user, page, this.state.userName, this.props.addAlert)
    }

    sendRequest(e) {
        send_subscription_request(e.target.value)
            .then((api_response) => {
                if (api_response.result) {
                    this.props.addAlert({ variant: "success", text: "Request sent" })
                }
                else {
                    this.props.addAlert({ variant: "danger", text: api_response.message })
                }
            })
    }

    handleChange(e){
        this.setState({userName:e.target.value})
    }


    render() {
        return (
            <SearchUsersComponent userName={this.state.userName} handleChange={this.handleChange} searchUsers={this.searchUsers} user_list={this.state.fetched_list} previous={this.state.previous} next={this.state.next} paginate={this.fetch_users} onClick={this.sendRequest} />
        )
    }

}

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });
const mapDispatchToProps = { addAlert };

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsersContainer)