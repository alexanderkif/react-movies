import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import useDetails from "./hook/useDetails";
import { DetailsView } from "./view/DetailsView";

export const Details: FunctionComponent = () => {

  const { id } = useParams();

  return <DetailsView {...useDetails(id as number)} />;
};
