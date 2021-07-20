import React, { FunctionComponent } from "react";
import styles from "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Footer from "./components/Footer";

export const App: FunctionComponent = () => {
  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          <Route path="/movies/:id">
            <Details />
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};
