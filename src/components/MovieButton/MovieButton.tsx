import React, { FunctionComponent } from 'react';
import { ButtonProps } from '../../types';
import styles from './MovieButton.scss';

export const MovieButton: FunctionComponent<ButtonProps> = (
  props: ButtonProps,
) => {
  const { text, active, small }: ButtonProps = props;
  const buttonStyles = [
    styles.MovieButton,
    active ? styles.MovieButton_active : '',
    small ? styles.MovieButton_small : '',
  ].join(' ');

  return <button className={buttonStyles}> {text} </button>;
};
