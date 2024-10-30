import { Box, Modal, Typography } from "@mui/material";

type BasicModalProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
};

const BasicModal: React.FC<BasicModalProps> = ({
  title,
  children,
  isOpen,
  closeModal,
}) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 2,
          borderRadius: 1,
          outline: "none",
          maxWidth: 400,
          margin: "auto",
          marginTop: "20%",
        }}
      >
        <Typography variant="h5">{title}</Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default BasicModal;
