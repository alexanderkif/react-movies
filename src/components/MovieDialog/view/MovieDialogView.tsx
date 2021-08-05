import React, { FunctionComponent, useState, MouseEvent } from "react";
import { IMovieDialogError, IMovieDialogParams } from "../../../types";
import styles from "./MovieDialog.scss";
import CloseIcon from '@material-ui/icons/Close';
import { useFormik } from "formik";
import Selector from "../../Selector";
import { ALL_GENRES } from "../../../pages/Search/view/SearchView";

export const MovieDialogView: FunctionComponent<IMovieDialogParams> = (props: IMovieDialogParams) => {
  const { editMovie, selectorHandler, genres, setDialogOpenedHandler } = props;

  const [closeSelector, setCloseSelector] = useState<boolean>(false);

  const validate = values => {
    const errors: IMovieDialogError = {}

    if (!values.title) {
      errors.title = 'Required';
    } else if (values.title.length < 3) {
      errors.title = 'Must be 3 characters or more'
    }

    if (!values.poster_path) {
      errors.poster_path = 'Required';
    }

    if (!genres?.length) {
      errors.genres = 'Required';
    }

    if (!values.overview) {
      errors.overview = 'Required';
    } else if (values.overview.length < 5) {
      errors.overview = 'Must be 5 characters or more'
    }

    if (!values.runtime) {
      errors.runtime = 'Required';
    } else if (values.runtime !== (+values.runtime).toString()) {
      errors.runtime = 'Must be number'
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      title: editMovie?.title || '',
      release_date: editMovie?.release_date || '2021-08-01',
      poster_path: editMovie?.poster_path || '',
      genres: editMovie?.genres,
      overview: editMovie?.overview || '',
      runtime: editMovie?.runtime || 0,
    },
    validate,
    onSubmit: values => { console.log('onSubmit', values) },
  })

  const clickFormHandler = (e: MouseEvent) => {
    console.log('clickFormHandler');
    e.stopPropagation();
    setCloseSelector(!closeSelector);
  };

  return (
    <div className={styles.MovieDialog__darkWrapper} onClick={() => setDialogOpenedHandler(false)}>
      <div className={styles.MovieDialog__formWrapper} onClick={clickFormHandler}>
        <CloseIcon className={styles.MovieDialog__closeIcon} onClick={() => setDialogOpenedHandler(false)} />
        <div className={styles.MovieDialog__label}>
          {editMovie?.id ? 'edit movie' : 'Add movie'}
        </div>
        <form onSubmit={formik.handleSubmit} className={styles.MovieDialog__form}>
          {editMovie?.id ?
            <div className={styles.MovieDialog__row}>
              <label htmlFor="title">movie id</label>
              <div className={styles.MovieDialog__id}>{editMovie?.id}</div>
            </div> : null}

          <div className={styles.MovieDialog__row}>
            <label htmlFor="title">title</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} type="text" id='title' name='title' />
            {formik.errors.title ? <div className={styles.MovieDialog__error}>{formik.errors.title}</div> : null}
          </div>

          <div className={styles.MovieDialog__row}>
            <label className={styles.MovieDialog__inputLabel} htmlFor="release_date">release date</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.release_date} type="date" id='release_date' name='release_date' />
          </div>

          <div className={styles.MovieDialog__row}>
            <label className={styles.MovieDialog__inputLabel} htmlFor="poster_path">movie url</label>
            <input onChange={formik.handleChange} value={formik.values.poster_path} type="text" id='poster_path' name='poster_path' />
            {formik.errors.poster_path ? <div className={styles.MovieDialog__error}>{formik.errors.poster_path}</div> : null}
          </div>

          <div className={styles.MovieDialog__row}>
            <label className={styles.MovieDialog__inputLabel} htmlFor="genres">genre</label>
            <div className={styles.MovieDialog__selector}>
              <Selector value={genres?.join(', ')} options={ALL_GENRES} selectorHandler={selectorHandler} id='genres' name='genres' closeSelector={closeSelector} />
            </div>
            {formik.errors.genres ? <div className={styles.MovieDialog__error}>{formik.errors.genres}</div> : null}
          </div>

          <div className={styles.MovieDialog__row}>
            <label className={styles.MovieDialog__inputLabel} htmlFor="overview">overview</label>
            <input onChange={formik.handleChange} value={formik.values.overview} type="text" id='overview' name='overview' />
            {formik.errors.overview ? <div className={styles.MovieDialog__error}>{formik.errors.overview}</div> : null}
          </div>

          <div className={styles.MovieDialog__row}>
            <label className={styles.MovieDialog__inputLabel} htmlFor="runtime">runtime</label>
            <input onChange={formik.handleChange} value={formik.values.runtime} type="text" id='runtime' name='runtime' />
            {formik.errors.runtime ? <div className={styles.MovieDialog__error}>{formik.errors.runtime}</div> : null}
          </div>

          <div className={styles.MovieDialog__buttons}>
            <button className={styles.MovieDialog__resetBtn} type='reset'>reset</button>
            <button className={styles.MovieDialog__submitBtn} type='submit'>submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
