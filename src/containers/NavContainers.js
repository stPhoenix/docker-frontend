import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavComponent from '../components/NavComponent'
import { logout } from '../slices/auth';

class NavContainer extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        e.preventDefault()
        this.props.logout()
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        let userName = "Guest"
        let avatar = "#"
        if (isAuthenticated && this.props.auth.userData) {
            userName = this.props.auth.userData.username
            avatar = this.props.auth.userData.avatar
        }
        return (<NavComponent isAuthenticated={isAuthenticated} userName={userName} avatar={avatar} onClick={this.handleClick} />)
    }
}

const matchStateToProps = (state) => ({ auth: state.auth });

export default connect(matchStateToProps, {logout})(NavContainer);