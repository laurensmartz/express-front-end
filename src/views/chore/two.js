import React, { Component } from "react";
import { sendRequest } from "../../axios/axios";

class Two extends Component {
  constructor(props) {
    super(props);

    this.reqLucyInfo = this.reqLucyInfo.bind(this);
  }
  reqLucyInfo() {
    console.log("object");
    sendRequest({
      methods: "post",
      url: "/test"
    });
  }

  render() {
    return (
      <div>
        hello two
        <button onClick={this.reqLucyInfo}>ajax</button>
      </div>
    );
  }
}

export default Two;
