import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

type BasicModalProps = PropsWithChildren & {
  title: string;
  isOpen: boolean;
  titleColor?: string;
  width?: string | number;
  height?: string | number;
  closeModal: () => void;
};

const BasicModal: React.FC<BasicModalProps> = ({
  title,
  isOpen,
  titleColor = "primary",
  width = 400,
  height = "auto",
  children,
  closeModal,
}) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 1,
          outline: "none",
          width,
          height,
          position: "absolute",
          top: "50%",
          left: "80%",
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
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
        <Typography variant="h5" color={titleColor} sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: height,
            paddingRight: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
