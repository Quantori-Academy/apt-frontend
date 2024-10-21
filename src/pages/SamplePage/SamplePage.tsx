import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import { PageLoader, SampleDetails } from "@/components";
import { PageError } from "@/components/PageError";
import {
  useGetSampleDetailsQuery,
  useGetStorageLocationDetailQuery,
} from "@/store";

const SamplePage = () => {
  const { id: sampleId } = useParams();
  const { data: sampleDetails, isLoading: isSampleLoading } =
    useGetSampleDetailsQuery(sampleId!);

  const { data: sampleLocationDetails, isLoading: isSampleLocationLoadiong } =
    useGetStorageLocationDetailQuery(sampleDetails?.locationId as number, {
      skip: !sampleDetails?.locationId,
    });

  if (isSampleLoading || isSampleLocationLoadiong) {
    return <PageLoader />;
  }

  if (!sampleDetails || !sampleLocationDetails) {
    return (
      <PageError
        text={"Failed to load sample details. Please try again later."}
      />
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <SampleDetails
        sampleDetails={sampleDetails}
        sampleLocationDetails={sampleLocationDetails}
      />
    </Container>
  );
};

export default SamplePage;
