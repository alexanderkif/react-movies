import React, { FunctionComponent } from "react";
import { IMovieDialogParams } from "../../../types";
import styles from "./MovieDialog.scss";
import CloseIcon from '@material-ui/icons/Close';
import DropdownList from "../../../components/DropdownList";
import { ALL_GENRES } from "../../../utils/constants";

export const MovieDialogView: FunctionComponent<IMovieDialogParams> = (props: IMovieDialogParams) => {
  const {
    editMovie,
    dropdownHandler,
    genres,
    setDialogOpenedHandler,
    deleteMovie = false,
    closeDropdown,
    formik,
    clickFormHandler,
    deleteMovieSubmit
  } = props;

  if (deleteMovie) {
    return (
      <div className={styles.darkWrapper} onClick={() => setDialogOpenedHandler(false)}>
        <div className={styles.formWrapper} onClick={clickFormHandler}>
          <CloseIcon className={styles.closeIcon} onClick={() => setDialogOpenedHandler(false)} />
          <div className={styles.label}>delete movie</div>
          <div className={styles.deleteText}>
            Are you sure you want to delete this movie?
          </div>
          <div className={styles.buttons}>
            <button className={styles.submitBtn} type='submit' onClick={deleteMovieSubmit}>confirm</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.darkWrapper} onClick={() => setDialogOpenedHandler(false)}>
      <div className={styles.formWrapper} onClick={clickFormHandler}>
        <CloseIcon className={styles.closeIcon} onClick={() => setDialogOpenedHandler(false)} />
        <div className={styles.label}>
          {editMovie?.id ? 'edit movie' : 'Add movie'}
        </div>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          {editMovie?.id ?
            <div className={styles.row}>
              <label htmlFor="title">movie id</label>
              <div className={styles.id}>{editMovie?.id}</div>
            </div> : null}

          <div className={styles.row}>
            <label htmlFor="title">title</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} type="text" id='title' name='title' />
            {formik.errors.title ? <div className={styles.error}>{formik.errors.title}</div> : null}
          </div>

          <div className={styles.row}>
            <label className={styles.inputLabel} htmlFor="release_date">release date</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.release_date} type="date" id='release_date' name='release_date' />
          </div>

          <div className={styles.row}>
            <label className={styles.inputLabel} htmlFor="poster_path">movie url</label>
            <input onChange={formik.handleChange} value={formik.values.poster_path} type="text" id='poster_path' name='poster_path' />
            {formik.errors.poster_path ? <div className={styles.error}>{formik.errors.poster_path}</div> : null}
          </div>

          <div className={styles.row}>
            <label className={styles.inputLabel} htmlFor="genres">genre</label>
            <div className={styles.dropdown}>
              <DropdownList value={genres?.join(', ')} options={ALL_GENRES} dropdownHandler={dropdownHandler} id='genres' name='genres' closeDropdown={closeDropdown} />
            </div>
            {formik.errors.genres ? <div className={styles.error}>{formik.errors.genres}</div> : null}
          </div>

          <div className={styles.row}>
            <label className={styles.inputLabel} htmlFor="overview">overview</label>
            <input onChange={formik.handleChange} value={formik.values.overview} type="text" id='overview' name='overview' />
            {formik.errors.overview ? <div className={styles.error}>{formik.errors.overview}</div> : null}
          </div>

          <div className={styles.row}>
            <label className={styles.inputLabel} htmlFor="runtime">runtime</label>
            <input onChange={formik.handleChange} value={formik.values.runtime} type="number" id='runtime' name='runtime' />
            {formik.errors.runtime ? <div className={styles.error}>{formik.errors.runtime}</div> : null}
          </div>

          <div className={styles.buttons}>
            <button className={styles.resetBtn} type='reset' onClick={() => setDialogOpenedHandler(false)}>reset</button>
            <button
              className={styles.submitBtn}
              type='submit'
            >submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
