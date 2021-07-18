import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Test } from "./Test";
import { ChooseTest } from "./ChooseTest";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path={`/test/:testId`} children={<Test />} />
          <Route path="/">
            <ChooseTest />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
