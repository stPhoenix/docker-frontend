import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomeComponent } from '../components/HomeComponent';
import { Redirect } from 'react-router';
class HomeContainer extends Component {

    render() {
        if (!this.props.isAuthenticated) {
            return (
                <Redirect to="/login" />
            )
        }
        return (
            <HomeComponent>
            </HomeComponent>
        )
    }
}

const matchStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(matchStateToProps)(HomeContainer);