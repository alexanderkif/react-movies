import { MouseEvent } from "react";
import { ISortByDropdownParams, IUseSortByDropdownParams } from "../../../types";
import { SORTS_BY } from "../../../utils/constants";


const useSortByDropdown = ({
  sortBy,
  sortOrder,
  dispatchSetSortBy,
  dispatchSetSortOrder
}: IUseSortByDropdownParams): ISortByDropdownParams => {

  const sortHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const index = SORTS_BY
      .map((s) => s.name.toLowerCase())
      .indexOf(target.innerText.toLowerCase());
    if (index === -1) return;
    if (target.innerText.toLowerCase() === sortBy?.name.toLowerCase()) {
      toggleSortOrder();
    } else {
      dispatchSetSortBy(SORTS_BY[index]);
    }
  };

  const toggleSortOrder = () => {
    dispatchSetSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }

  return { sortHandler, sortBy };
}

export default useSortByDropdown;
