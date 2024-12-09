import { Container } from "@mui/material";

import { ReagentDetails, SampleDetails } from "@/components";
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
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {substanceType === "Reagent" ? (
        <ReagentDetails reagentDetails={substanceDetails as Reagent} />
      ) : (
        <SampleDetails sampleDetails={substanceDetails as Sample} />
      )}
    </Container>
  );
};

export default SubstanceDetails;
