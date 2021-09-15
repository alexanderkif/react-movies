import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { SearchView } from './view/SearchView';
import useSearch from './hook/useSearch';
import { RootState } from '../../redux/reducers';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Search: FunctionComponent = () => {
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const moviesState = useSelector((state: RootState) => state.moviesState);

  return (
    <SearchView {...useSearch(query, history, { dispatch, moviesState })} />
  );
};
