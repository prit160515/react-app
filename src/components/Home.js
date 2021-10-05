import React, { Component } from "react";
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

  render() {
    return (
      <div className="home">
        <div className="intro-text">
          lorem lorem lorem lorem lorem lorem lorem lorem lorem
        </div>

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
      </div>
    );
  }
}

export default Home;
