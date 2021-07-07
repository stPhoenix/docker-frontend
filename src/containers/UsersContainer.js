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
    }

    componentDidMount() {
        this.fetch_users(1)
    }

    fetch_users(page) {
        get_user_list(this.props.tokens, {page})
            .then((api_response)=>{
                if (api_response)
                {
                    this.setState({user_list: api_response.data.results, next: api_response.data.next, previous:api_response.data.previous})
                }
                else {
                    this.props.addAlert({variant:"danger", text:api_response.message})
                }
            })
    }


    render() {
        return (
            <UsersComponent user_list={this.state.user_list}/>
        )
    }

}

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated, tokens: { access: state.auth.access, refresh: state.auth.refresh } });
const mapDispatchToProps = { addAlert };

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)