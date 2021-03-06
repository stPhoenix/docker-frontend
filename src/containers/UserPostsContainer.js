import React, { Component } from 'react';
import { HomeComponent } from '../components/HomeComponent';
import { get_user_posts, get_my_posts } from '../api';
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
        if (this.state.id === "my")
        {
            fetch_id_data_page(this.setState, get_my_posts, page, this.state.id, this.props.addAlert)
        }
        else
        {
            fetch_id_data_page(this.setState, get_user_posts, page, this.state.id, this.props.addAlert)
        }
        
    }

    render() {
        return (
            <HomeComponent userId={this.props.userId} title="User posts" posts_list={this.state.fetched_list} previous={this.state.previous} next={this.state.next} paginate={this.fetch_posts}/>
        )
    }
}
const mapStateToProps = (state) => ({userId: state.auth.userData.id})
export default connect(mapStateToProps,{addAlert})(UserPostsContainer);