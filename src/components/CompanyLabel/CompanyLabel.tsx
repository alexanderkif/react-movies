import React, { FunctionComponent } from "react";
import styles from "./CompanyLabel.scss";
import { useHistory } from "react-router-dom";

export const CompanyLabel: FunctionComponent = () => {

  const history = useHistory();

  const toHome = () => {
    history.push('/');
    history.go(0);
  };

  return (
    <div onClick={toHome} className={styles.link}>
      <b>netflix</b>roulette
    </div>
  );
};
