import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { JobList, JobView } from "./components/Job";
import { PropertyList, PropertyView } from "./components/Property";
import { Navigation } from "./components/Navigation";
import { AddEditJobView } from "./components/Job/Add";

const App = () => (
  <Router>
    <Navigation children={
      <Switch>
        <Route exact path="/" component={ JobList } />
        <Route exact path="/jobs" component={ JobList } />
        <Route exact path="/job/add" component={ AddEditJobView } />
        <Route exact path="/job/:id/edit" component={ AddEditJobView } />
        <Route exact path="/job/:id" component={ JobView } />
        <Route exact path="/properties" component={ PropertyList } />
        <Route exact path="/property/:id" component={ PropertyView } />
      </Switch>
    }/>
  </Router>
);

export default App;
