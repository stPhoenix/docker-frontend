import React, { Component } from 'react';
import { create_post } from '../api';
import { add as addAlert } from "../slices/alerts";
import { connect } from 'react-redux';
import { CreatePostComponent } from '../components/CreatePostComponent';


class CreatePostContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            text: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.sendPost = this.sendPost.bind(this)
    }

    handleChange(e)
    {
        this.setState({[e.target.name]: e.target.value})
    }

    sendPost(e){
        e.preventDefault()
        let {title, text} = this.state
        create_post({title, text})
        .then((api_response)=>{
            if (api_response.result)
            {
                this.props.addAlert({variant:"success", text:"Post created"})
                this.setState({title:"", text: ""})
            }
            else{
                this.props.addAlert({variant:"danger", text:api_response.message})
            }
        })
    }

    render() {
        return (
            <CreatePostComponent text={this.state.text} title={this.state.title} handleChange={this.handleChange} sendPost={this.sendPost} />
        )
    }
}

export default connect(null,{addAlert})(CreatePostContainer);