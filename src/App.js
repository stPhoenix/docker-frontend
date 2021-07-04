import NavContainer from './containers/NavContainers';
import LoginContainer from './containers/LoginContainer';
import { Switch, Route } from 'react-router';
import HomeContainer from './containers/HomeContainer';



function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <section className="col-3">
          <NavContainer />
        </section>
        <main className="col-9">
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/login" component={LoginContainer} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
