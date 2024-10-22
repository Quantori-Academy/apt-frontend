import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";

import { PageError, PageLoader, SubstanceDetails } from "@/components";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig";
import { useGetSampleDetailsQuery } from "@/store";

const SamplePage: React.FC = () => {
  const { id: sampleId } = useParams<{ id: string }>();

  const {
    data: sampleDetails,
    isError,
    isLoading: isSampleLoading,
  } = useGetSampleDetailsQuery(sampleId ? sampleId : skipToken);

  if (isSampleLoading) {
    return <PageLoader />;
  }

  if (!sampleDetails || !sampleId || isError) {
    return (
      <PageError
        text={"Failed to load sample details. Please try again later."}
      />
    );
  }

  return (
    <SubstanceDetails
      substanceType="sample"
      substanceId={sampleId}
      substanceDetails={sampleDetails}
      redirectPath={RouteProtectedPath.samplePage}
    />
  );
};

export default SamplePage;
