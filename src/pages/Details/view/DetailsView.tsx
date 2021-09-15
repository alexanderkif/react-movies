import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import styles from './Details.scss';
import CompanyLabel from '../../../components/CompanyLabel';
import ListMovies from '../../../components/ListMovies';
import { IDetailViewParams } from '../../../types';
import GenresPanel from '../../../components/GenresPanel';
import SortBySelector from '../../SortBySelector';
import MovieDialog from '../../MovieDialog';
import { LIMIT_MOVIES_IN_DETAILS } from '../../../utils/constants';
import MovieDetails from '../../../components/MovieDetails';

export const DetailsView: FunctionComponent<IDetailViewParams> = (
  props: IDetailViewParams,
) => {
  const {
    dialogOpened,
    movie,
    moviesByGenre,
    activeGenreDetails,
    setActiveMovieHandler,
  } = props;

  return (
    <div className={styles.details}>
      <div className={styles.backgrounded}>
        <div className={styles.bgDark}>
          <div className={styles.topBar}>
            <CompanyLabel />
            <Link className={styles.linkToSearch} to="/">
              <SearchIcon />
            </Link>
          </div>
          {movie && <MovieDetails movie={movie} />}
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.border_bottom}>
          <GenresPanel
            genres={movie?.genres}
            setActiveMovieHandler={setActiveMovieHandler}
            activeGenre={activeGenreDetails}
          />
          <SortBySelector />
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.moviesFound}>
          <span>
            {moviesByGenre && moviesByGenre.length > LIMIT_MOVIES_IN_DETAILS - 1
              ? `${LIMIT_MOVIES_IN_DETAILS} or more`
              : moviesByGenre?.length}
          </span>
          &nbsp;movies found
        </div>
      </div>
      <ListMovies movies={moviesByGenre} />
      {dialogOpened && <MovieDialog />}
    </div>
  );
};
