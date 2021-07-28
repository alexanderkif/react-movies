import React, { FunctionComponent } from "react";
import { useState } from "react";
import { ISortBySelectorParams } from "../../../types";
import styles from "./SortBySelector.scss";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export const SortBySelectorView: FunctionComponent<ISortBySelectorParams> = (props: ISortBySelectorParams) => {
  const { sorts, sortBy, sortHandler } = props;

  const [isOpen, setIsOpen] = useState(false);

  const popupHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.SortBySelector__sortBy}>
      <div className={styles.SortBySelector__sortLabel}>Sort by</div>
      <div className={styles.SortBySelector__value} onClick={popupHandler}>
        {sortBy?.name}
        <div className={isOpen ? styles.SortBySelector__popup : styles.SortBySelector__closed} onClick={sortHandler}>
          {sorts?.map((s) => (
            <div
              key={s.key}
              className={isOpen ? styles.SortBySelector__genre_opened : styles.SortBySelector__closed}
            >
              <span className={s.name === sortBy?.name ? styles.SortBySelector__genre_active : styles.SortBySelector__genre}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
        <ArrowDropDownIcon
          className={isOpen ? styles.SortBySelector__arrow_up : styles.SortBySelector__arrow_down}
        />
      </div>
    </div>
  );
};
