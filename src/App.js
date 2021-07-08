import NavContainer from './containers/NavContainers';
import LoginContainer from './containers/LoginContainer';
import { Switch, Route, Redirect } from 'react-router';
import HomeContainer from './containers/HomeContainer';
import SignupContainer from "./containers/SignupContainer";
import CustomAlertContainer from "./containers/CustomAlertContainer";
import React from "react";
import UsersContainer from "./containers/UsersContainer";
import { connect } from 'react-redux';
import MySubscriptionsContainer from "./containers/MySubscriptionsContainer";
import ToMeSubscriptionsContainer from "./containers/ToMeSubscriptionsContainer";



function App(props) {
  const goAuth = ( <Redirect to="/login" />)
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
          {props.isAuthenticated ? "" : goAuth}
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/signup" component={SignupContainer} />
            <Route path="/users" component={UsersContainer} />
            <Route path="/subscriptions/my" component={MySubscriptionsContainer} />
            <Route path="/subscriptions/to-me" component={ToMeSubscriptionsContainer} />
          </Switch>
          </section>
        </main>
      </div>
    </div>
  );
}

const matchStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(matchStateToProps)(App);
