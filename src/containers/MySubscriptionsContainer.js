import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_my_subscriptions, abort_sub_request } from '../api'
import { add as addAlert } from "../slices/alerts";
import { fetch_data_page } from '../tools/fetch_data_page';
import { MySubscriptionsComponent } from "../components/MySubscriptionsComponent";

class UsersContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetched_list: [],
            next: null,
            previous: null
        }
        this.fetch_subscriptions = this.fetch_subscriptions.bind(this)
        this.setState = this.setState.bind(this)
        this.abortRequest = this.abortRequest.bind(this)
    }

    componentDidMount() {
        this.fetch_subscriptions(1)
    }

    fetch_subscriptions(page) {
        fetch_data_page(this.setState, get_my_subscriptions, page, this.props.addAlert)
    }

    abortRequest(e) {
        abort_sub_request(e.target.value)
            .then((api_response) => {
                if (api_response.result) {
                    this.props.addAlert({ variant: "success", text: "Request aborted" })
                    this.fetch_subscriptions(1)
                }
                else {
                    this.props.addAlert({ variant: "danger", text: api_response.message })
                }
            })
    }


    render() {
        return (
            <MySubscriptionsComponent subscriptions_list={this.state.fetched_list} previous={this.state.previous} next={this.state.next} paginate={this.fetch_users} onClick={this.abortRequest} />
        )
    }

}

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });
const mapDispatchToProps = { addAlert };

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)