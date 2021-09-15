import React, { FunctionComponent } from 'react';
import styles from './Footer.scss';
import CompanyLabel from '../CompanyLabel';

export const Footer: FunctionComponent = () => (
  <div className={styles.panel}>
    <CompanyLabel />
  </div>
);
