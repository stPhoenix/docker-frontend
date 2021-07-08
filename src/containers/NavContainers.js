import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavComponent from '../components/NavComponent'

class NavContainer extends Component {

    render() {
        const { isAuthenticated } = this.props.auth;
        let userName = "Guest"
        let avatar = "#"
        if (isAuthenticated && this.props.auth.userData) {
            userName = this.props.auth.userData.username
            avatar = this.props.auth.userData.avatar
        }
        return (<NavComponent isAuthenticated={isAuthenticated} userName={userName} avatar={avatar} />)
    }
}

const matchStateToProps = (state) => ({ auth: state.auth });

export default connect(matchStateToProps)(NavContainer);