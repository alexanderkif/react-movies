import React, { FunctionComponent } from "react";
import { ISortByDropdownParams } from "../../../types";
import styles from "./SortByDropdown.scss";
import DropdownList from "../../DropdownList";
import { SORTS_BY } from "../../../utils/constants";

export const SortByDropdownView: FunctionComponent<ISortByDropdownParams> = (props: ISortByDropdownParams) => {
  const { sortBy, sortHandler } = props;

  return (
    <div className={styles.sortBy}>
      <div className={styles.sortLabel}>Sort by</div>
      <div className={styles.dropdown}>
        <DropdownList
          options={SORTS_BY.map((s) => s.name)}
          value={sortBy?.name}
          position={{ top: '2rem' }}
          dropdownHandler={sortHandler}
        />
      </div>
    </div>
  );
};
