import React, { Component } from 'react';
import { get_my_post, update_post, delete_post } from '../api';
import { add as addAlert } from "../slices/alerts";
import { connect } from 'react-redux';
import { EditPostComponent } from '../components/EditPostComponent';
import { Redirect } from 'react-router-dom';


class EditPostContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.match.params.id,
            text: "",
            title: "",
            post: null,
            deleted: false
        }
        this.setState = this.setState.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.updatePost = this.updatePost.bind(this)
    }

    componentDidMount() {
        this.fetch_post()
    }

    deletePost(e){
        e.preventDefault()
        delete_post(this.state.id)
        .then((api_response)=>{
            if (api_response.result)
            {
                this.props.addAlert({variant: "success", text: "Post deleted"})
                this.setState({deleted: true})
            }
            else {
                this.props.addAlert({variant: "danger", text: api_response.message})
            }
        })
    }

    updatePost(e){
        e.preventDefault()
        const {title, text} = this.state
        update_post({title, text}, this.state.id)
        .then((api_response) => {
            if (api_response.result) {
                this.props.addAlert({variant: "success", text: "Post updated"})
            }
            else {
                this.props.addAlert({variant: "danger", text: api_response.message})
            }
        })
    }

    fetch_post() {
        get_my_post(this.state.id)
            .then((api_response) => {
                if (api_response.result) {
                    this.setState({ post: api_response.data, title: api_response.data.title, text: api_response.data.text })
                }
                else {
                    this.props.addAlert({variant: "danger", text: api_response.message})
                }
            })
    }

    handleChange(e) {
        this.setState({ commentInput: e.target.value })
    }

  

    render() {
        if (this.state.deleted)
        {
            return (<Redirect to="/posts/my" />)
        }
        return (
            <EditPostComponent deletePost={this.deletePost} updatePost={this.updatePost} handleChange={this.handleChange} post={this.state.post} title={this.state.title} text={this.state.text}  />
        )
    }
}

export default connect(null, { addAlert })(EditPostContainer);