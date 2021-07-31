import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { JobList, JobView } from "./components/Job";
import { Home } from "./components/Home";
import { PropertyList, PropertyView } from "./components/Property";
import { Navigation } from "./components/Navigation";

const App = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/jobs" component={ JobList } />
      <Route exact path="/job" component={ JobView } />
      <Route exact path="/properties" component={ PropertyList } />
      <Route exact path="/property" component={ PropertyView } />
    </Switch>
  </Router>
);

export default App;
