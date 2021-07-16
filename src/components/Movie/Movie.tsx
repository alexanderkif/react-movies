import React, { FunctionComponent, SyntheticEvent } from 'react'
import { IMovieItem } from '../../types'
import styles from './Movie.scss'
import noImage from '../../assets/noImage.png'

console.log('noImage', noImage)

export interface IMovieProps {
  item: IMovieItem
}

export const Movie: FunctionComponent<IMovieProps> = ({
  item,
}: IMovieProps) => {
  const { poster_path, title, release_date, genres }: IMovieItem = item

  const handleImgOnError = (
    e: SyntheticEvent<EventTarget & HTMLImageElement>
  ): void | undefined => {
    const imgElement: HTMLImageElement = e.currentTarget
    imgElement.src = `${noImage}`
    return undefined
  }

  return (
    <div className={styles.Movie}>
      <img
        className={styles.picture}
        src={poster_path}
        onError={handleImgOnError}
      />
      <div className={styles.nameYear}>
        <div className={styles.name}>{title}</div>
        <div className={styles.year}>{release_date?.split('-')[0]}</div>
      </div>
      <div className={styles.genre}>{genres[0]}</div>
    </div>
  )
}
