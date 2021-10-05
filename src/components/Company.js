import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Company.css";

class Company extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.match.params.id);
  }
  render() {
    return <div className="company-page">blah blah blah</div>;
  }
}

export default withRouter(Company);
