import React, { FunctionComponent } from 'react'
import styles from './Footer.scss'
import CompanyLabel from '../CompanyLabel'

export const Footer: FunctionComponent = () => {
  return (
    <div className={styles.Footer}>
      <CompanyLabel />
    </div>
  )
}
