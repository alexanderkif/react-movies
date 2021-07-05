import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from './App.module.scss';
// import Counter from './pages/Counter';
// import Movies from './pages/Movies';

console.log(styles);

function App(): JSX.Element {
  return (
    <div className={styles.App}>
      <h1 className={styles.App__title}>Hello, World!</h1>
      <p>.env.KEY = {process.env.KEY}</p>
      {/* <Provider store={store}>
        <Router forceRefresh={true}>
          <div>
            <ul>
              <li>
                <Link to="/">Counter</Link>
              </li>
              <li>
                <Link to="/movies">Movies</Link>
              </li>
            </ul>

            <hr />
            
            <Switch>
              <Route exact path="/">
                <Counter />
              </Route>
              <Route path="/movies">
                <Movies />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider> */}
    </div>
  );
}

export default App;
