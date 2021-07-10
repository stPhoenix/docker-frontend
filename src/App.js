import NavContainer from './containers/NavContainers';
import LoginContainer from './containers/LoginContainer';
import { Switch, Route, Redirect } from 'react-router';
import HomeContainer from './containers/HomeContainer';
import SignupContainer from "./containers/SignupContainer";
import CustomAlertContainer from "./containers/CustomAlertContainer";
import UsersContainer from "./containers/UsersContainer";
import { connect } from 'react-redux';
import MySubscriptionsContainer from "./containers/MySubscriptionsContainer";
import ToMeSubscriptionsContainer from "./containers/ToMeSubscriptionsContainer";
import React, { Component } from 'react';
import { LocalStoreConnector } from './tools/localStoreConnector';
import { userData as dispatchUserData, login as dispatchLogin } from './slices/auth';
import { get_user } from './api';
import UserPostsContainer from './containers/UserPostsContainer';



class App extends Component {
  componentDidMount() {
    if (LocalStoreConnector.getItem("access") !== null) {
      get_user()
        .then(api_response => {
          if (api_response.result) {
            this.props.dispatchLogin({ access: LocalStoreConnector.getItem("access"), refresh: LocalStoreConnector.getItem("refresh") })
            this.props.dispatchUserData({ userData: api_response.data })
          }
        })
    }
  }
  render() {
    const goAuth = (<Redirect to="/login" />)
    return (
      <div className="container-fluid">
        <div className="row">
          <section className="col-3">
            <NavContainer />
          </section>
          <main className="col-9 d-flex flex-column">
            <section>
              <CustomAlertContainer />
            </section>
            <section>
              {this.props.isAuthenticated ? "" : goAuth}
              <Switch>
                <Route exact path="/" component={HomeContainer} />
                <Route path="/login" component={LoginContainer} />
                <Route path="/signup" component={SignupContainer} />
                <Route path="/users" component={UsersContainer} />
                <Route path="/subscriptions/my" component={MySubscriptionsContainer} />
                <Route path="/subscriptions/to-me" component={ToMeSubscriptionsContainer} />
                <Route path="/posts/user/:id" component={UserPostsContainer} />
              </Switch>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

const matchStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(matchStateToProps, { dispatchUserData, dispatchLogin })(App);
