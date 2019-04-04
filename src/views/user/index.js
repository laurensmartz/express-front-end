import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import One from "Views/chore/one";
import Two from "Views/chore/two";

function NoMatch({ location }) {
  return (
    <div>
      <h1>No match,{location.pathname}</h1>
    </div>
  );
}

class User extends Component {
  render() {
    return (
      <div>
        <div>User</div>
        <Link to={`${this.props.match.url}/one`}>one</Link>
        <Link to={`${this.props.match.url}/two`}>two</Link>
        <Link to={`${this.props.match.url}/no-match`}>No Match</Link>

        <Route path={`${this.props.match.path}/one`} component={One} />
        <Route path={`${this.props.match.path}/two`} component={Two} />
        <Route component={NoMatch} />
      </div>
    );
  }
}

export default User;
