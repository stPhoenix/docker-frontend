import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user_list } from '../api'
import {add as addAlert} from "../slices/alerts";
import {UsersComponent} from "../components/UsersComponent";
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
    }

    componentDidMount() {
        this.fetch_users(1)
    }

    fetch_users(page) {
        fetch_data_page(this.setState, get_user_list, this.props.tokens, page, this.props.addAlert)
    }


    render() {
        return (
            <UsersComponent user_list={this.state.fetched_list} previous={this.state.previous} next={this.state.next} paginate={this.fetch_users} />
        )
    }

}

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated, tokens: { access: state.auth.access, refresh: state.auth.refresh } });
const mapDispatchToProps = { addAlert };

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)