import React, { FunctionComponent, MouseEvent, useCallback, useEffect } from "react";
import { useState } from "react";
import { ISelectorParams } from "../../types";
import styles from "./Selector.scss";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export const Selector: FunctionComponent<ISelectorParams> = (props: ISelectorParams) => {
  const { options, value, selectorHandler, position, closeSelector } = props;

  const [isOpen, setIsOpen] = useState(false);

  const popupHandler = (e: MouseEvent) => {
    if (!isOpen) e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // console.log('Selector setIsOpen');
    setIsOpen(false);
  }, [closeSelector]);

  const setIsOpenFalse = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // console.log('Selector addEventListener');
    document.addEventListener('click', setIsOpenFalse);
    return () => document.removeEventListener('click', setIsOpenFalse);
  }, []);

  return (
    <div className={styles.Selector} onClick={popupHandler}>
      <div className={styles.Selector__main}>
        <div className={styles.Selector__input}>
          {value}
          <ArrowDropDownIcon
            className={isOpen ? styles.Selector__arrow_up : styles.Selector__arrow_down}
          />
        </div>
        <div className={isOpen ? styles.Selector__popup : styles.Selector__closed} style={position} onClick={selectorHandler}>
          {options?.map((s) => (
            <div
              key={s}
              className={isOpen ? styles.Selector__genre_opened : styles.Selector__closed}
            >
              <div className={value && value.toLowerCase().split(', ').includes(s.toLowerCase()) ? styles.Selector__genre_active : styles.Selector__genre}>
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
