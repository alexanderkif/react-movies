import React, { FunctionComponent, useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './ListMovies.scss'
import Movie from '../Movie'
import { getMovies } from './../../redux/actions'
import { IListMoviesProps } from '../../types'

const ListMovies: FunctionComponent<IListMoviesProps> = (
  props: IListMoviesProps
) => {
  useEffect(() => {
    props.getMoviesProps(12)
  }, [])

  console.log('props', props)

  return (
    <div className={styles.ListMovies}>
      {props.movies?.map(movie => (
        <Movie key={movie.id} item={movie} />
      ))}
    </div>
  )
}

function mapStateToProps(state) {
  const { moviesReducer } = state
  return moviesReducer
}

function mapDispatchToProps(dispatch) {
  return { getMoviesProps: limit => dispatch(getMovies({ limit })) }
}

export const ListMoviesComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListMovies)
