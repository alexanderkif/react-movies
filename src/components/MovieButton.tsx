import React from 'react';
import styles from './MovieButton.module.scss';

interface ButtonProps {
  text: string;
  active?: boolean;
  small?: boolean;
}

function MovieButton(props: ButtonProps): JSX.Element {
  const buttonStyles = [
    styles.MovieButton,
    props.active ? styles.MovieButton_active : '',
    props.small ? styles.MovieButton_small : '',
  ].join(' ');

  return <button className={buttonStyles}> {props.text} </button>;
}

export default MovieButton;
