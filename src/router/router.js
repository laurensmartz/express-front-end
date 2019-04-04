import React from 'react'
import { Switch, Route } from "react-router-dom";
import Home from "Views/home/home.js";
import User from 'Views/user'

function NoMatch({ location }) {
  return (
    <div>
      <h1>No match,{location.pathname}</h1>
    </div>
  )
}
const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/user" component={ User }></Route>
    <Route component={ NoMatch }></Route>
  </Switch>
);

export default Routes;
