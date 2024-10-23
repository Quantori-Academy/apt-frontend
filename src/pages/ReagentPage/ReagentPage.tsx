import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";

import { PageError, PageLoader, SubstanceDetails } from "@/components";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import { useGetReagentDetailsQuery } from "@/store";

const ReagentPage: React.FC = () => {
  const { id: reagentId } = useParams<{ id: string }>();

  const {
    data: reagentDetails,
    isError,
    isLoading: isReagentLoading,
  } = useGetReagentDetailsQuery(reagentId ? reagentId : skipToken);

  if (isReagentLoading) {
    return <PageLoader />;
  }

  if (!reagentDetails || !reagentId || isError) {
    return <PageError text={"Failed to load reagent details."} />;
  }

  return (
    <SubstanceDetails
      substanceType="Reagent"
      substanceId={reagentId}
      substanceDetails={reagentDetails}
      redirectPath={RouteProtectedPath.substances}
    />
  );
};

export default ReagentPage;
