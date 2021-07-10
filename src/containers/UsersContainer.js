import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user_list, send_subscription_request } from '../api'
import { add as addAlert } from "../slices/alerts";
import { UsersComponent } from "../components/UsersComponent";
import { fetch_data_page } from '../tools/fetch_data_page';

class UsersContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetched_list: [],
            next: null,
            previous: null
        }
        this.fetch_users = this.fetch_users.bind(this)
        this.setState = this.setState.bind(this)
        this.sendRequest = this.sendRequest.bind(this)
    }

    componentDidMount() {
        this.fetch_users(1)
    }

    fetch_users(page) {
        fetch_data_page(this.setState, get_user_list, page, this.props.addAlert)
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


    render() {
        return (
            <UsersComponent user_list={this.state.fetched_list} previous={this.state.previous} next={this.state.next} paginate={this.fetch_users} onClick={this.sendRequest} />
        )
    }

}

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });
const mapDispatchToProps = { addAlert };

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)