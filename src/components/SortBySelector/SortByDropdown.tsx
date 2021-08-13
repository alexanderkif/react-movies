import React, { FunctionComponent } from "react";
import useSortByDropdown from "./hook/useSortByDropdown";
import { SortByDropdownView } from "./view/SortByDropdownView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { setSortBy, setSortOrder } from "../../redux/actions";
import { SortByType, SortOrderType } from "../../types";

export const SortByDropdown: FunctionComponent = () => {

  const dispatch = useDispatch();

  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { sortBy, sortOrder } = moviesReducer;

  const dispatchSetSortBy = (sort: SortByType) => dispatch(setSortBy(sort));
  const dispatchSetSortOrder = (sortOrder: SortOrderType) => dispatch(setSortOrder(sortOrder));

  return <SortByDropdownView {...useSortByDropdown({
    sortBy,
    sortOrder,
    dispatchSetSortBy,
    dispatchSetSortOrder
  })} />;
};
