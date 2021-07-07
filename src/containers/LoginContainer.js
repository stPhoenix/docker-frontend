import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login as apiLogin, get_user } from '../api'
import { LoginComponent } from '../components/LoginComponent'
import { login as dispatchLogin, userData as dispatchUserData } from '../slices/auth'
import {add as addAlert} from "../slices/alerts";

class LoginContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
        this.login = this.login.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    login(e) {
        e.preventDefault();
        apiLogin(this.state.username, this.state.password)
            .then(api_response => {
                if (api_response.result) {
                    let { access, refresh } = api_response.data
                    this.props.dispatchLogin({ access, refresh })
                    get_user(this.props.tokens)
                        .then(api_response => {
                            if (api_response.result) {
                                this.props.dispatchUserData({ userData: api_response.data })
                                this.props.addAlert({variant: "success", text: "Login success."})
                            }
                            else {
                                this.props.addAlert(({variant: "danger", text: api_response.message}))
                            }
                        })
                }
                else {
                    this.props.addAlert(({variant: "danger", text: api_response.message}))
                }

            });
    };
    render() {
        return (
            <LoginComponent click={this.login} username={this.state.username} passowrd={this.state.password} onChange={this.onChange} />
        )
    }

}

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated, tokens: { access: state.auth.access, refresh: state.auth.refresh } });
const mapDispatchToProps = { dispatchLogin, dispatchUserData, addAlert };

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)