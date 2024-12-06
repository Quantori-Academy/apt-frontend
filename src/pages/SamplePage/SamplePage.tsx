import { skipToken } from "@reduxjs/toolkit/query";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  DashboardBreadcrumbs,
  PageError,
  PageLoader,
  SubstanceDetails,
} from "@/components";
import { RouteProtectedPath } from "@/router";
import { useGetSampleDetailsQuery } from "@/store";

const SamplePage: React.FC = () => {
  const { t } = useTranslation();

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
    return <PageError text={t("substanceDetails.errors.sampleLoadError")} />;
  }

  return (
    <>
      <DashboardBreadcrumbs />
      <SubstanceDetails
        substanceType="Sample"
        substanceId={sampleId}
        substanceDetails={sampleDetails}
        redirectPath={RouteProtectedPath.substances}
      />
    </>
  );
};

export default SamplePage;
