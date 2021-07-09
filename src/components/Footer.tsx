import React from 'react';
import styles from './Footer.module.scss';
import CompanyLabel from './CompanyLabel';

function Footer(): JSX.Element {
  return (
    <div className={styles.Footer}>
      <CompanyLabel />
    </div>
  );
}

export default Footer;
