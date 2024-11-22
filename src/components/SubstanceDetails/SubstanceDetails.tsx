import { Container } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  PageError,
  PageLoader,
  ReagentDetails,
  ReagentEditForm,
  SampleDetails,
} from "@/components";
import { useGetStorageLocationDetailQuery } from "@/store";
import { Reagent, Sample, SubstancesCategory } from "@/types";

type Substance = Reagent | Sample;

type SubstanceDetailsProps = {
  substanceType: SubstancesCategory;
  substanceId: string;
  substanceDetails: Substance;
  redirectPath: string;
};

const SubstanceDetails: React.FC<SubstanceDetailsProps> = ({
  substanceType,
  substanceDetails,
}) => {
  const { t } = useTranslation();

  const [isChangingQuantity, setIsChangingQuantity] = useState(false);
  const [isChangingLocation, setIsChangingLocation] = useState(false);

  const {
    data: substanceLocationDetails,
    isLoading: isSubstanceLocationLoading,
  } = useGetStorageLocationDetailQuery(
    substanceDetails ? substanceDetails.locationId : skipToken
  );

  if (isSubstanceLocationLoading) {
    return <PageLoader />;
  }

  if (!substanceLocationDetails) {
    return (
      <PageError
        text={t(
          `substanceDetails.errors.${substanceType === "Reagent" ? "reagentLoadError" : "sampleLoadError"}`
        )}
      />
    );
  }

  const handleCancel = () => {
    setIsChangingQuantity(false);
    setIsChangingLocation(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {substanceType === "Reagent" ? (
        <ReagentDetails
          reagentDetails={substanceDetails as Reagent}
          reagentLocationDetails={substanceLocationDetails}
          setIsChangingQuantity={setIsChangingQuantity}
          setIsChangingLocation={setIsChangingLocation}
        />
      ) : (
        <SampleDetails
          sampleDetails={substanceDetails as Sample}
          sampleLocationDetails={substanceLocationDetails}
          setIsChangingQuantity={setIsChangingQuantity}
          setIsChangingLocation={setIsChangingLocation}
        />
      )}
      {(isChangingQuantity || isChangingLocation) && (
        <ReagentEditForm
          substanceType={substanceType}
          isChangingQuantity={isChangingQuantity}
          isChangingLocation={isChangingLocation}
          onCancel={handleCancel}
          substanceDetails={substanceDetails}
          substanceLocationDetails={substanceLocationDetails}
        />
      )}
    </Container>
  );
};

export default SubstanceDetails;
