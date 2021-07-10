import React, { Component } from 'react';
import { connect } from 'react-redux';
import {sign_up as apiSignup} from "../api";
import {Redirect} from "react-router-dom"
import {SignUpComponent} from "../components/SignupComponent";
import {add as addAlert} from "../slices/alerts";

class SignupContainer extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            avatar: "",
            banner: "",
            email: ""
        }
        this.signup = this.signup.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onChangeFile = this.onChangeFile.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };
    onChangeFile(e) {
        this.setState({ [e.target.name]: e.target.files[0] });
    };
    signup(e){
        e.preventDefault()
        apiSignup(this.state).then((api_response) => {
            if (api_response.result)
            {
              this.props.addAlert(({variant: "success", text: "Sign up success"}))
            }
            else{
                this.props.addAlert(({variant: "danger", text: api_response.message}))
            }
        })
    }
    render() {
        if (this.props.isAuthenticated)
        {
            return (<Redirect to="/" />)
        }
        return (
            <SignUpComponent {...this.state} click={this.signup} handleChange={this.onChange} handleChangeFile={this.onChangeFile} />
        )
    }
}

const mapStateToProps = (state) => ({isAuthenticated: state.auth.isAuthenticated})
const mapDispatchToProps = {addAlert,}
export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer)