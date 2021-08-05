import React, { FunctionComponent } from "react";
import { ISortBySelectorParams } from "../../../types";
import styles from "./SortBySelector.scss";
import Selector from "../../Selector";

export const SortBySelectorView: FunctionComponent<ISortBySelectorParams> = (props: ISortBySelectorParams) => {
  const { sorts, sortBy, sortHandler } = props;

  return (
    <div className={styles.SortBySelector__sortBy}>
      <div className={styles.SortBySelector__sortLabel}>Sort by</div>
      <div className={styles.SortBySelector__selector}>
        <Selector options={sorts?.map((s) => s.name)} value={sortBy?.name} position={{ top: '2rem' }} selectorHandler={sortHandler} />
      </div>
    </div>
  );
};
