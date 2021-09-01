import React, { FunctionComponent, MouseEvent, useCallback, useEffect } from "react";
import { useState } from "react";
import { IDropdownParams } from "../../types";
import styles from "./DropdownList.scss";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import cn from 'classnames';
import { isOptionInOptionsString } from "../../utils/isOptionInOptionsString";

export const DropdownList: FunctionComponent<IDropdownParams> = (props: IDropdownParams) => {
  const { options, value, dropdownHandler, position, closeDropdown } = props;

  const [isClosed, setIsClosed] = useState(true);

  const popupHandler = (e: MouseEvent) => {
    if (isClosed) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
    setIsClosed(!isClosed);
  };

  useEffect(() => {
    setIsClosed(true);
  }, [closeDropdown]);

  const setIsClosedTrue = useCallback(() => {
    setIsClosed(true);
  }, []);

  useEffect(() => {
    window.addEventListener('click', setIsClosedTrue);
    return () => window.removeEventListener('click', setIsClosedTrue);
  }, []);

  return (
    <div className={styles.dropdown} onClick={popupHandler}>
      <div className={styles.main}>
        <div className={styles.input}>
          {value}
          <div className={cn(styles.arrow_down, { [styles.arrow_up]: !isClosed })} >
            <ArrowDropDownIcon />
          </div>
        </div>
        <div className={styles.popup} style={position} onClick={dropdownHandler}>
          {options?.map((option) => (
            <div
              key={option}
              className={cn(styles.genre_opened, { [styles.genre_closed]: isClosed })}
            >
              <div className={cn(styles.genre, { [styles.genre_active]: isOptionInOptionsString(option, value || '') })}>
                {option}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
