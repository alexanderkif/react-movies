import React, { FunctionComponent, MouseEvent, useCallback, useEffect } from "react";
import { useState } from "react";
import { IDropdownParams } from "../../types";
import styles from "./DropdownList.scss";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import cn from 'classnames';

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
          <div className={cn(styles.arrow_down, { [styles.arrow_up]: isOpen })} >
            <ArrowDropDownIcon />
          </div>
        </div>
        <div className={styles.popup} style={position} onClick={dropdownHandler}>
          {options?.map((option) => (
            <div
              key={option}
              className={cn(styles.genre_opened, { [styles.genre_closed]: !isOpen })}
            >
              <div className={cn(styles.genre, { [styles.genre_active]: isOptionInValue(option) })}>
                {option}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
