import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy, setSortOrder } from "../../../redux/actions";
import { RootState } from "../../../redux/reducers";
import { ISortBySelectorParams, SortByType } from "../../../types";

export const sorts: SortByType[] = [
  { key: 'release_date', name: 'release date' },
  { key: 'vote_average', name: 'rating' },
  { key: 'budget', name: 'budget' },
  { key: 'revenue', name: 'revenue' },
];

const useSortBySelector = (): ISortBySelectorParams => {

  const dispatch = useDispatch();

  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { sortBy, sortOrder } = moviesReducer;

  const sortHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const index = sorts
      .map((s) => s.name.toLocaleLowerCase())
      .indexOf(target.innerText.toLocaleLowerCase());
    if (index === -1) return;
    if (target.innerText.toLowerCase() === sortBy?.name.toLowerCase()) {
      toggleSortOrder();
    } else {
      dispatch(setSortBy(sorts[index]));
    }
  };

  const toggleSortOrder = () => {
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
  }

  return { sortHandler, sortBy, sorts };
}

export default useSortBySelector;
