import { SyntheticEvent } from 'react';
import { IMovieItem, IUseMovie } from '../../../types';
import noImage from '../../../assets/noImage.png';

const useMovie = (
  setDialogOpenedHandler: (
    isOpen: boolean,
    movie?: IMovieItem,
    isDelete?: boolean
  ) => void,
  // eslint-disable-next-line
  history
): IUseMovie => {
  function handleMovieClick(id?: number) {
    history.push(`/movies/${id}`);
  }

  const editMovieHandle = (item: IMovieItem) => {
    setDialogOpenedHandler(true, item, false);
  };

  const deleteMovieHandle = (item: IMovieItem) => {
    setDialogOpenedHandler(true, item, true);
  };

  const handleImgOnError = (
    e: SyntheticEvent<EventTarget & HTMLImageElement>,
  ): void => {
    const imgElement: HTMLImageElement = e.currentTarget;
    imgElement.setAttribute(
      'src',
      imgElement.alt === 'test component' ? 'test component' : noImage,
    );
    imgElement.alt = 'noImage';
  };

  return {
    handleMovieClick,
    editMovieHandle,
    deleteMovieHandle,
    handleImgOnError,
  };
};

export default useMovie;
