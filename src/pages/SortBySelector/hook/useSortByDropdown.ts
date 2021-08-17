import { MouseEvent } from "react";
import { ISortByDropdownParams, IUseMovieStateWithDispatchParams } from "../../../types";
import { SORTS_BY } from "../../../utils/constants";
import { setSortBy, setSortOrder } from "../../../redux/actions";


const useSortByDropdown = ({ dispatch, moviesState }: IUseMovieStateWithDispatchParams): ISortByDropdownParams => {

  const { sortBy, sortOrder } = moviesState;

  const sortHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const index = SORTS_BY
      .map((s) => s.name.toLowerCase())
      .indexOf(target.innerText.toLowerCase());
    if (index === -1) return;
    if (target.innerText.toLowerCase() === sortBy?.name.toLowerCase()) {
      toggleSortOrder();
    } else {
      dispatch(setSortBy(SORTS_BY[index]));
    }
  };

  const toggleSortOrder = () => {
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
  }

  return { sortHandler, sortBy };
}

export default useSortByDropdown;