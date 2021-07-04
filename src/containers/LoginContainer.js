import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login as apiLogin, get_user } from '../api'
import { LoginComponent } from '../components/LoginComponent'
import { login as dispatchLogin, userData as dispatchUserData } from '../slices/auth'

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
                    get_user(this.props.access)
                        .then(api_response => {
                            if (api_response.result) {
                                this.props.dispatchUserData({ userData: api_response.data })
                            }
                        })
                }
                else {
                    // Login error
                }

            });
    };
    render() {
        return (
            <LoginComponent click={this.login} username={this.state.username} passowrd={this.state.password} onChange={this.onChange} />
        )
    }

}

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated, access: state.auth.access });
const mapDispatchToProps = { dispatchLogin, dispatchUserData };

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)