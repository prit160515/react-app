import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
