import React, { FunctionComponent } from "react";
import useSortByDropdown from "./hook/useSortByDropdown";
import { SortByDropdownView } from "./view/SortByDropdownView";

export const SortByDropdown: FunctionComponent = () => {

  return <SortByDropdownView {...useSortByDropdown()} />;
};
