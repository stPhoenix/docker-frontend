import NavContainer from './containers/NavContainers';
import LoginContainer from './containers/LoginContainer';
import { Switch, Route } from 'react-router';
import HomeContainer from './containers/HomeContainer';
import SignupContainer from "./containers/SignupContainer";
import CustomAlertContainer from "./containers/CustomAlertContainer";
import React from "react";


function App() {
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
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/signup" component={SignupContainer} />
          </Switch>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
