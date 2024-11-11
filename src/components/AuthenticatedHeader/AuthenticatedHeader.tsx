import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Box, IconButton, Typography } from "@mui/material";
import * as React from "react";

import { AccountMenu, NotificationMenu } from "@/components";
import { userRoles } from "@/constants";
import { useAppSelector, useMenu } from "@/hooks";
import { selectUserRole, selectUsername } from "@/store/slices";

const AuthenticatedHeader: React.FC = () => {
  const username = useAppSelector(selectUsername);
  const role = useAppSelector(selectUserRole);
  const { anchorEl, open, handleOpen, handleClose } = useMenu();
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
      {role !== userRoles.Administrator && (
        <>
          <IconButton onClick={handleOpen}>
            <NotificationsNoneIcon />
          </IconButton>
          <NotificationMenu
            notificationText={
              "You need to change your password, or you'll locked out"
            }
            anchorEl={anchorEl}
            handleClose={handleClose}
            open={open}
          />
        </>
      )}
    </Box>
  );
};

export default AuthenticatedHeader;
