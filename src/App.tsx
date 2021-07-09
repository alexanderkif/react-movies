import React from 'react';
import styles from './App.module.scss';
import Search from './pages/Search';
import Footer from './components/Footer';

function App(): JSX.Element {
  return (
    <div className={styles.App}>
      <Search />
      <Footer />
    </div>
  );
}

export default App;
