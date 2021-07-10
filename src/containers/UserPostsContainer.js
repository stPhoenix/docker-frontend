import React, { Component } from 'react';
import { HomeComponent } from '../components/HomeComponent';
import { get_user_posts } from '../api';
import {fetch_id_data_page} from '../tools/fetch_data_page'
import { add as addAlert } from "../slices/alerts";
import { connect } from 'react-redux';


class UserPostsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.match.params.id,
            fetched_list: [],
            next: null,
            previous: null
        }
        this.fetch_posts = this.fetch_posts.bind(this)
        this.setState = this.setState.bind(this)
    }

    componentDidMount() {
        this.fetch_posts(1)
    }

    fetch_posts(page) {
        fetch_id_data_page(this.setState, get_user_posts, page, this.state.id, this.props.addAlert)
    }

    render() {
        return (
            <HomeComponent title="User posts" posts_list={this.state.fetched_list} previous={this.state.previous} next={this.state.next} paginate={this.fetch_posts}/>
        )
    }
}

export default connect(null,{addAlert})(UserPostsContainer);