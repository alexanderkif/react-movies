import React, { FunctionComponent } from "react";
import { IMovieButtonProps } from "../../types";
import styles from "./MovieButton.scss";

export const MovieButton: FunctionComponent<IMovieButtonProps> = (
  props: IMovieButtonProps
) => {
  const { text, active, small, clickHandler }: IMovieButtonProps = props;
  const buttonStyles = [
    styles.button,
    active ? styles.active : "",
    small ? styles.small : "",
  ].join(" ");

  return (
    <button className={buttonStyles} onClick={clickHandler}>
      {text}
    </button>
  );
};
