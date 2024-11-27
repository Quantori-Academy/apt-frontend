import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Box, IconButton, Typography } from "@mui/material";

import { AccountMenu, ResetPasswordNotification } from "@/components";
import { useAppSelector, useMenu } from "@/hooks";
import { selectUsername } from "@/store";

const AuthUserInfo: React.FC = () => {
  const username = useAppSelector(selectUsername);

  const {
    anchorEl: accountAnchorEl,
    open: accountOpen,
    handleOpen: handleAccountOpen,
    handleClose: handleAccountClose,
  } = useMenu();

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        margin={3}
        textAlign="center"
      >
        <IconButton
          color="inherit"
          sx={{ padding: 0 }}
          onClick={(e) => handleAccountOpen(e)}
        >
          <PermIdentityIcon
            sx={{
              width: 40,
              height: 40,
              border: "2px solid white",
              borderRadius: "50%",
              padding: "5px",
            }}
          />
        </IconButton>
        <Typography textAlign="center">{username}</Typography>
        <AccountMenu
          anchorEl={accountAnchorEl}
          open={accountOpen}
          onClose={handleAccountClose}
        />
      </Box>
      <ResetPasswordNotification />
    </Box>
  );
};

export default AuthUserInfo;
