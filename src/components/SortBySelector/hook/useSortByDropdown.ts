import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy, setSortOrder } from "../../../redux/actions";
import { RootState } from "../../../redux/reducers";
import { ISortByDropdownParams } from "../../../types";
import { SORTS_BY } from "../../../utils/constants";


const useSortByDropdown = (): ISortByDropdownParams => {

  const dispatch = useDispatch();

  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { sortBy, sortOrder } = moviesReducer;

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
