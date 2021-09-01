import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import useDetails from "./hook/useDetails";
import { DetailsView } from "./view/DetailsView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

export const Details: FunctionComponent = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const moviesState = useSelector((state: RootState) => state.moviesState);

  return <DetailsView {...useDetails(id, dispatch, moviesState)} />;
};
