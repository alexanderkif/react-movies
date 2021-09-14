import React, { FunctionComponent } from "react";
import { SearchView } from "./view/SearchView";
import useSearch from "./hook/useSearch";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Search: FunctionComponent = () => {

  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const moviesState = useSelector((state: RootState) => state.moviesState);

  return <SearchView {...useSearch(query, history, { dispatch, moviesState })} />;
};
