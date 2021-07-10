import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_to_me_subscriptions, proceed_sub_request } from '../api'
import { add as addAlert } from "../slices/alerts";
import { fetch_data_page } from '../tools/fetch_data_page';
import { ToMeSubscriptionsComponent } from "../components/ToMeSubscriptionsComponent";

class ToMeSubscriptionsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetched_list: [],
            next: null,
            previous: null
        }
        this.fetch_subscriptions = this.fetch_subscriptions.bind(this)
        this.setState = this.setState.bind(this)
        this.proceedRequest = this.proceedRequest.bind(this)
    }

    componentDidMount() {
        this.fetch_subscriptions(1)
    }

    fetch_subscriptions(page) {
        fetch_data_page(this.setState, get_to_me_subscriptions, page, this.props.addAlert)
    }

    proceedRequest(e) {
        console.debug(e)
        const { target, status, id } = e
        proceed_sub_request(id, { target, status })
            .then((api_response) => {
                if (api_response.result) {
                    const text = e.target.status === 1 ? "accepted" : "denied"
                    this.props.addAlert({ variant: "success", text: `Request ${text}` })
                    this.fetch_subscriptions(1)
                }
                else {
                    this.props.addAlert({ variant: "danger", text: api_response.message })
                }
            })
    }


    render() {
        return (
            <ToMeSubscriptionsComponent subscriptions_list={this.state.fetched_list} previous={this.state.previous} next={this.state.next} paginate={this.fetch_subscriptions} onClick={this.proceedRequest} />
        )
    }

}

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });
const mapDispatchToProps = { addAlert };

export default connect(mapStateToProps, mapDispatchToProps)(ToMeSubscriptionsContainer)