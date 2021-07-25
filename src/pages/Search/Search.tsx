import React, { FunctionComponent } from "react";
import { SearchView } from "./view/SearchView";
import useSearch from "./hook/useSearch";

export const Search: FunctionComponent = () => {

  return <SearchView {...useSearch()} />;
};
