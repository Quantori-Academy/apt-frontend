import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";

type BasicModalProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  titleColor?: string;
};

const BasicModal: React.FC<BasicModalProps> = ({
  title,
  children,
  isOpen,
  closeModal,
  titleColor = "primary",
}) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 1,
          outline: "none",
          maxWidth: 400,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" color={titleColor}>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default BasicModal;
