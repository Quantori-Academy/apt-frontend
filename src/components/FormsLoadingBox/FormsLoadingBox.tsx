import { Box, CircularProgress, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: "translate(-50%, -50%)",
};

const FormsLoadingBox: React.FC = () => {
  return (
    <Modal open>
      <Box sx={style}>
        <CircularProgress color="secondary" size="105px" />
      </Box>
    </Modal>
  );
};

export default FormsLoadingBox;
