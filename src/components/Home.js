import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      search_keyword: "",
      search_results: [],
      loading: false,
    };
  }

  validateResponse = (errored, response) => {
    if (errored) {
      alert(
        "Could not fetch companies. Check that the backend is running, reachable and returns valid JSON."
      );
      return false;
    }

    if (!response.bestMatches.length) {
      alert("No companies found, try a different keyword");
      return false;
    }

    return true;
  };

  performAPICall = async (keyword) => {
    let response = {};
    let errored = false;

    this.setState({
      loading: true,
    });

    try {
      response = await (
        await fetch(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=9LOY9RJL9JNLIGHC`
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

  Search = async () => {
    const keyword = this.textInput.current.value;
    if (keyword.length > 0) {
      const resp = await this.performAPICall(keyword);
      if (resp) {
        this.setState({
          search_results: resp.bestMatches,
        });
      }

      console.log(this.state.search_results);
    }
  };

  getCompanyElement = (company, key) => {
    const sym = company["1. symbol"];
    const c_name = company["2. name"];
    //console.log(sym);

    return (
      <Link key={sym} to={`/company/${sym}`}>
        <div className="company-element">
          <div className="symbol-name">{sym}</div>
          <div className="comp-name">{c_name}</div>
        </div>
      </Link>
    );
  };

  render() {
    return (
      <div className="home">
        <div className="intro-text">
          <div>Stocks Search</div>
        </div>

        <div className="search-container">
          <div className="input-bar">
            <input
              type="text"
              ref={this.textInput}
              placeholder="Enter symbol/company name"
            />
            <div type="button" className="search-icon" onClick={this.Search}>
              SH
            </div>
          </div>

          <div className="companies">
            {this.state.loading ? (
              <div>Loading Companies...</div>
            ) : this.state.search_results.length > 1 ? (
              this.state.search_results.map((company, key) =>
                this.getCompanyElement(company, key)
              )
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
