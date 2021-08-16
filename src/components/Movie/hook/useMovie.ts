import { SyntheticEvent } from "react";
import { IMovieActions, IMovieItem, IUseMovie } from "../../../types";
import noImage from "../../../assets/noImage.png";

const useMovie = (
  openMovieDialog: (isOpen: boolean, movie: IMovieItem, isDelete?: boolean) => IMovieActions
): IUseMovie => {

  const editMovieHandle = (item: IMovieItem) => {
    openMovieDialog(true, item, false);
  };

  const deleteMovieHandle = (item: IMovieItem) => {
    openMovieDialog(true, item, true);
  };

  const handleImgOnError = (
    e: SyntheticEvent<EventTarget & HTMLImageElement>
  ): void | undefined => {
    const imgElement: HTMLImageElement = e.currentTarget;
    imgElement.src = `${noImage}`;
    return undefined;
  };

  return {
    editMovieHandle,
    deleteMovieHandle,
    handleImgOnError
  };
}

export default useMovie;
