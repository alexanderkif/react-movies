import React, { FunctionComponent, MouseEvent, useCallback, useEffect } from "react";
import { useState } from "react";
import { IDropdownParams } from "../../types";
import styles from "./DropdownList.scss";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export const DropdownList: FunctionComponent<IDropdownParams> = (props: IDropdownParams) => {
  const { options, value, dropdownHandler, position, closeDropdown } = props;

  const [isOpen, setIsOpen] = useState(false);

  const popupHandler = (e: MouseEvent) => {
    if (!isOpen) e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [closeDropdown]);

  const setIsOpenFalse = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', setIsOpenFalse);
    return () => document.removeEventListener('click', setIsOpenFalse);
  }, []);

  const isOptionInValue = (option: string) => value?.toLowerCase().split(', ').includes(option.toLowerCase());

  return (
    <div className={styles.dropdown} onClick={popupHandler}>
      <div className={styles.main}>
        <div className={styles.input}>
          {value}
          <ArrowDropDownIcon
            className={isOpen ? styles.arrow_up : styles.arrow_down}
          />
        </div>
        <div className={isOpen ? styles.popup : styles.closed} style={position} onClick={dropdownHandler}>
          {options?.map((option) => (
            <div
              key={option}
              className={isOpen ? styles.genre_opened : styles.closed}
            >
              <div className={isOptionInValue(option) ? styles.genre_active : styles.genre}>
                {option}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
