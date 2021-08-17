import React, { FunctionComponent } from "react";
import useSortByDropdown from "./hook/useSortByDropdown";
import { SortByDropdownView } from "./view/SortByDropdownView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

export const SortByDropdown: FunctionComponent = () => {

  const dispatch = useDispatch();

  const moviesState = useSelector((state: RootState) => state.moviesState);

  return <SortByDropdownView {...useSortByDropdown({ dispatch, moviesState })} />;
};
