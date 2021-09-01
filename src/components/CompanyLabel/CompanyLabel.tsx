import React, { FunctionComponent } from "react";
import styles from "./CompanyLabel.scss";
import { Link } from "react-router-dom";

export const CompanyLabel: FunctionComponent = () => {

  return (
    <Link to="/" className={styles.link}>
      <b>netflix</b>roulette
    </Link>
  );
};
