import React, { Component } from 'react';
import { get_comments, get_post, rate_post, send_comment } from '../api';
import { fetch_id_data_page } from '../tools/fetch_data_page'
import { add as addAlert } from "../slices/alerts";
import { connect } from 'react-redux';
import { PostComponent } from '../components/PostComponent';


class PostContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.match.params.id,
            fetched_list: [],
            next: null,
            previous: null,
            post: null,
            commentInput: ""
        }
        this.fetch_comments = this.fetch_comments.bind(this)
        this.setState = this.setState.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.sendComment = this.sendComment.bind(this)
        this.ratePost = this.ratePost.bind(this)
    }

    componentDidMount() {
        this.fetch_post()
        this.fetch_comments(1)
    }

    fetch_post() {
        get_post(this.state.id)
            .then((api_response) => {
                if (api_response.result) {
                    this.setState({ post: api_response.data })
                }
            })
    }

    fetch_comments(page) {
        fetch_id_data_page(this.setState, get_comments, page, this.state.id, this.props.addAlert)
    }

    handleChange(e) {
        this.setState({ commentInput: e.target.value })
    }

    ratePost(e) {
        e.preventDefault()
        rate_post({ post: this.state.id, rate: e.target.value })
            .then((api_response) => {
                if (api_response.result) {
                    this.props.addAlert({ variant: "success", text: "Post rated" })
                    this.fetch_post()
                }
                else {
                    this.props.addAlert({ variant: "danger", text: api_response.message })
                }
            })
    }

    sendComment(e) {
        e.preventDefault()
        send_comment({ post: this.state.id, text: this.state.commentInput })
            .then((api_response) => {
                if (api_response.result) {
                    this.props.addAlert({ variant: "success", text: "Comment sent" })
                    this.setState({commentInput: ""})
                    this.fetch_comments(1)
                }
                else {
                    this.props.addAlert({ variant: "danger", text: api_response.message })
                }
            })
    }

    render() {
        return (
            <PostComponent sendComment={this.sendComment} ratePost={this.ratePost} handleChange={this.handleChange} post={this.state.post} comments_list={this.state.fetched_list} previous={this.state.previous} next={this.state.next} paginate={this.fetch_comments} />
        )
    }
}

export default connect(null, { addAlert })(PostContainer);