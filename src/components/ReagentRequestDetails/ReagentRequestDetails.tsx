import { Box, Button } from "@mui/material";

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
  return (
    <BasicModal
      isOpen={modalOpen}
      closeModal={onClose}
      title="Reagent Request Detail"
    >
      Details
      <Box>
        <Button>Edit</Button>
      </Box>
    </BasicModal>
  );
};

export default ReagentRequestDetails;
