import { MouseEvent } from 'react';
import {
  ISortByDropdownParams,
  IUseMovieStateWithDispatchParams,
} from '../../../types';
import { SORTS_BY } from '../../../utils/constants';
import { setSortBy, setSortOrder } from '../../../redux/actions';
import getTextFromElement from '../../../utils/getTextFromElement';

const useSortByDropdown = ({
  dispatch,
  moviesState,
}: IUseMovieStateWithDispatchParams): ISortByDropdownParams => {
  const { sortBy, sortOrder } = moviesState;

  const sortHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const index = SORTS_BY.map((s) => s.name.toLowerCase()).indexOf(
      getTextFromElement(target.innerHTML).trim().toLowerCase(),
    );
    if (index === -1) return;
    if (
      getTextFromElement(target.innerHTML).trim().toLowerCase()
      === sortBy?.name.toLowerCase()
    ) {
      toggleSortOrder();
    } else {
      dispatch(setSortBy(SORTS_BY[index]));
    }
  };

  const toggleSortOrder = () => {
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
  };

  return { sortHandler, sortBy };
};

export default useSortByDropdown;
