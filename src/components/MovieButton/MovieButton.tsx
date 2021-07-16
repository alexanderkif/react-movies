import React, { FunctionComponent } from 'react'
import { IMovieButtonProps } from '../../types'
import styles from './MovieButton.scss'

export const MovieButton: FunctionComponent<IMovieButtonProps> = (
  props: IMovieButtonProps
) => {
  const { text, active, small }: IMovieButtonProps = props
  const buttonStyles = [
    styles.MovieButton,
    active ? styles.MovieButton_active : '',
    small ? styles.MovieButton_small : '',
  ].join(' ')

  return <button className={buttonStyles}> {text} </button>
}
