import React, { FunctionComponent } from 'react'
import styles from './App.scss'
import Search from './pages/Search'
import Footer from './components/Footer'

export const App: FunctionComponent = () => {
  return (
    <div className={styles.App}>
      <Search />
      <Footer />
    </div>
  )
}
