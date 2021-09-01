import React, { FunctionComponent } from "react";
import { IGenresPanelParams } from "../../types";
import MovieTextButton from "../MovieTextButton";
import styles from "./GenresPanel.scss";

export const GenresPanel: FunctionComponent<IGenresPanelParams> = (props: IGenresPanelParams) => {
  const { genres, setActiveMovieHandler, activeGenre } = props;
  return (
    <div className={styles.filmsBy} onClick={setActiveMovieHandler}>
      {genres?.map((genre) => (
        <div key={genre} className={styles.filmsByBtns}>
          <MovieTextButton
            text={genre}
            active={genre.toLowerCase() === activeGenre?.toLowerCase()}
          />
        </div>
      ))}
    </div>
  );
};
