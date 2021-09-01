import React, { FunctionComponent } from "react";
import styles from "./ListMovies.scss";
import Movie from "../../pages/Movie";
import { IListMoviesProps } from "../../types";

export const ListMovies: FunctionComponent<IListMoviesProps> = (
  props: IListMoviesProps
) => {
  const { movies } = props;

  return (
    <div className={styles.wrapper}>
      {movies?.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
