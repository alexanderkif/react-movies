import React, { FunctionComponent } from "react";
import useSortBySelector from "./hook/useSortBySelector";
import { SortBySelectorView } from "./view/SortBySelectorView";

export const SortBySelector: FunctionComponent = () => {

  return <SortBySelectorView {...useSortBySelector()} />;
};

