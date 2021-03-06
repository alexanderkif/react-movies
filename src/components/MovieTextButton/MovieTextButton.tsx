import React, { FunctionComponent } from "react";
import { IMovieButtonProps } from "../../types";
import styles from "./MovieTextButton.scss";

export const MovieTextButton: FunctionComponent<IMovieButtonProps> = (
  props: IMovieButtonProps
) => {
  const { text, active }: IMovieButtonProps = props;
  const buttonStyles = [
    styles.button,
    active ? styles.button_active : "",
  ].join(" ");

  return <button className={buttonStyles}> {text} </button>;
};
