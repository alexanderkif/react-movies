import React, { FunctionComponent } from "react";
import { IGenresPanelParams } from "../../types";
import MovieTextButton from "../MovieTextButton";
import styles from "./GenresPanel.scss";

export const GenresPanel: FunctionComponent<IGenresPanelParams> = (props: IGenresPanelParams) => {
  const { genres, setActiveMovieHandler, activeGenre } = props;
  return (
    <div className={styles.GenresPanel__filmsBy} onClick={setActiveMovieHandler}>
      {genres?.map((g) => (
        <div key={g} className={styles.GenresPanel__filmsByBtns}>
          <MovieTextButton
            text={g}
            active={g.toLowerCase() === activeGenre?.toLowerCase()}
          />
        </div>
      ))}
    </div>
  );
};
