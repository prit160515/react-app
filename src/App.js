import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Company from "./components/Company";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/company/:id">
          <Company />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
