import React, { FunctionComponent } from "react";
import { IMovieTextButtonProps } from "../../types";
import styles from "./MovieTextButton.scss";

/**
 * Primary UI text button component with active properties
 */
export const MovieTextButton: FunctionComponent<IMovieTextButtonProps> = (
  props: IMovieTextButtonProps
) => {
  const { text, active }: IMovieTextButtonProps = props;
  const buttonStyles = [
    styles.button,
    active ? styles.button_active : "",
  ].join(" ");

  return <button className={buttonStyles}> {text} </button>;
};
