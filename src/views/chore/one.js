import React, { Component } from "react";

class One extends Component {
  render() {
    return (
      <div>
        <h1>
          this is one, it's params is <span>{this.props.match.params.type}</span>
        </h1>
      </div>
    );
  }
}

export default One
