import React, { FunctionComponent } from "react";
import styles from "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./redux/reducers";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Footer from "./components/Footer";
import Page404 from "./pages/Page404";

const composeEnhancers =
  // eslint-disable-next-line
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const App: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/movies/:id">
              <Details />
            </Route>
            <Route exact path="/">
              <Search />
            </Route>
            <Route component={Page404} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
};
