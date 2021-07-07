import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user_list } from '../api'
import {add as addAlert} from "../slices/alerts";
import {UsersComponent} from "../components/UsersComponent";

class UsersContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_list: [],
            next: null,
            previous: null
        }
        this.fetch_users = this.fetch_users.bind(this)
    }

    componentDidMount() {
        this.fetch_users(1)
    }

    fetch_users(page) {
        get_user_list(this.props.tokens, {page})
            .then((api_response)=>{
                if (api_response)
                {
                    const regex = /(?<=page\=)\d+/gm;
                    let found_prev = api_response.data.previous != null ? api_response.data.previous.match(regex) : null
                    let found_next = api_response.data.next != null ? api_response.data.next.match(regex) : null
                    let previous = found_prev ? found_prev[0] : null
                    let next = found_next ? found_next[0] : null

                    this.setState({user_list: api_response.data.results, next, previous})
                }
                else {
                    this.props.addAlert({variant:"danger", text:api_response.message})
                }
            })
    }


    render() {
        return (
            <UsersComponent user_list={this.state.user_list} previous={this.state.previous} next={this.state.next} paginate={this.fetch_users} />
        )
    }

}

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated, tokens: { access: state.auth.access, refresh: state.auth.refresh } });
const mapDispatchToProps = { addAlert };

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)