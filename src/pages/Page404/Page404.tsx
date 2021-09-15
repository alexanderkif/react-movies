import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './Page404.scss';
import notFoundImage from '../../assets/404.png';
import CompanyLabel from '../../components/CompanyLabel';

export const Page404: FunctionComponent = () => {
  const imgElement = document.querySelector('#notFoundImage');
  imgElement?.setAttribute('src', notFoundImage);

  return (
    <div className={styles.page}>
      <div className={styles.topPanel}>
        <CompanyLabel />
      </div>
      <div className={styles.title}>Page Not Found</div>
      <img id="notFoundImage" />
      <Link to="/" className={styles.link}>
        Go back to home
      </Link>
    </div>
  );
};
