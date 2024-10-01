import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

type ConfirmationModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
};

const DeleteOrEditConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  handleClose,
  title,
}) => {
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid palevioletred",
    borderRadius: 2.5,
    boxShadow: 24,
    p: 2,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Box>
            {title === "Delete Storage" ? (
              <Typography id="modal-description" sx={{ mt: 2 }}>
                Are you sure you want to delete this storage location?
              </Typography>
            ) : (
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "30ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Room"
                  id="outlined-room"
                  defaultValue="e.g. Building 1, Room 12"
                />
                <TextField
                  label="Name"
                  id="outlined-name"
                  defaultValue="e.g. Cabinet 1, shelf 3"
                />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                borderColor: "palevioletred",
                p: 0.7,
                px: 1.5,
                color: "palevioletred",
              }}
              variant="contained"
            >
              Cancel
            </Button>
            {title === "Delete Storage" ? (
              <Button
                onClick={handleClose}
                sx={{
                  borderColor: "red",
                  p: 0.7,
                  px: 1.5,
                  color: "error.main",
                }}
                variant="contained"
              >
                Delete
              </Button>
            ) : (
              <Button
                onClick={handleClose}
                sx={{
                  borderColor: "green",
                  p: 0.7,
                  px: 1.5,
                  color: "success.main",
                }}
              >
                Save
              </Button>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteOrEditConfirmationModal;
