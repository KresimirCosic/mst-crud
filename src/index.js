// Service Worker
import * as serviceWorker from "./serviceWorker";
// React
import React from "react";
// MobX React
import { Provider } from "mobx-react";
// React Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// React DOM
import ReactDOM from "react-dom";
// Styles
import "./index.css";
// Pages
import Home from "./pages/Home/Home";

const AppRoot = (
  <Provider>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(AppRoot, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
