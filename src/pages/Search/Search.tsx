import React, { FunctionComponent } from "react";
import { SearchView } from "./view/SearchView";
import useSearch from "./hook/useSearch";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";

export const Search: FunctionComponent = () => {

  const dispatch = useDispatch();
  const moviesState = useSelector((state: RootState) => state.moviesState);

  return <SearchView {...useSearch({ dispatch, moviesState })} />;
};
