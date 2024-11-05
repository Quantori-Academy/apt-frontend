import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

import { BasicModal } from "@/components";

type ReagentRequestDetailsProps = {
  onClose: () => void;
  requestId: string;
  modalOpen: boolean;
};

const ReagentRequestDetails: React.FC<ReagentRequestDetailsProps> = ({
  onClose,
  modalOpen,
  // requestId,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <BasicModal
      isOpen={modalOpen}
      closeModal={onClose}
      title="Reagent Request Detail"
    >
      {!isEditMode && (
        <Box
          margin={5}
          display="flex"
          justifyContent="center"
          gap={3}
          flexDirection="column"
        >
          <Typography>Reagent Name: </Typography>
          <Typography>CAS Number:</Typography>
          <Typography>Desired Quantity:</Typography>
          <Typography>Status:</Typography>
          <Typography>User Comments:</Typography>
          <Typography>Procurement Comments:</Typography>
        </Box>
      )}

      <Box>
        {!isEditMode && (
          <Button onClick={() => setIsEditMode(true)}>Edit</Button>
        )}
      </Box>
    </BasicModal>
  );
};

export default ReagentRequestDetails;
