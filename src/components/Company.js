import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Company.css";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
    };
  }

  // A function to validate response recieved from the performAPICall
  validateResponse = (errored, response) => {
    if (errored) {
      alert(
        "Could not fetch company's details. Check that the backend is running, reachable and returns valid JSON."
      );
      return false;
    }

    if (Object.keys(response["Global Quote"]).length === 0) {
      alert("Company details not found, try a different keyword");
      return false;
    }

    return true;
  };

  // A function to fetch a company's data from api endpoint provided by Alpha Vantage.
  // sym is the text that is extracted from the url (company's symbol name)
  performAPICall = async (sym) => {
    let response = {};
    let errored = false;

    this.setState({
      loading: true,
    });

    try {
      response = await (
        await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=9LOY9RJL9JNLIGHC`
        )
      ).json();
    } catch (e) {
      errored = true;
    }

    this.setState({
      loading: false,
    });

    if (this.validateResponse(errored, response)) {
      //console.log(response);
      return response;
    }
  };

  // If a response exists, update the state
  getDetails = async (sym) => {
    const response = await this.performAPICall(sym);
    if (response) {
      this.setState({
        details: response["Global Quote"],
      });
    }
    console.log(this.state.details);
  };

  componentDidMount() {
    const sym = this.props.match.params.id;
    this.getDetails(sym);
  }

  render() {
    return (
      <div className="company-page">
        <div className="c-details">
          {/* A quick look at the company's current price and the relative change */}
          <div className="c-price">
            <div className="stock-name">{this.state.details["01. symbol"]}</div>
            <div className="sub-stock-name">
              <div className="open-price">
                {this.state.details["05. price"]}&nbsp;&nbsp;
              </div>
              <div className="price-change">
                {this.state.details["10. change percent"]}
                {this.state.details["05. price"] >
                this.state.details["02. open"] ? (
                  <CaretUpOutlined className="icon-up" />
                ) : (
                  <CaretDownOutlined className="icon-down" />
                )}
              </div>
            </div>
          </div>

          {/* Company's Data in the form of a Table */}
          <div className="c-table">
            <table class="table">
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Opening Price</td>
                  <td>{this.state.details["02. open"]}</td>
                </tr>
                <tr>
                  <td>Max Price</td>
                  <td>{this.state.details["03. high"]}</td>
                </tr>
                <tr>
                  <td>Min Price</td>
                  <td>{this.state.details["04. low"]}</td>
                </tr>
                <tr>
                  <td>Volume</td>
                  <td>{this.state.details["06. volume"]}</td>
                </tr>
                <tr>
                  <td>Latest Trading Day</td>
                  <td>{this.state.details["07. latest trading day"]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Company);
