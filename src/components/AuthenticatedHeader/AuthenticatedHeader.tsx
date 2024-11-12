import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Box, IconButton, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import {
  AccountMenu,
  BasicModal,
  NotificationMenu,
  PageLoader,
} from "@/components";
import { userRoles } from "@/constants";
import { useAppSelector, useMenu } from "@/hooks";
import { RouteProtectedPath } from "@/router/protectedRoutesRouterConfig.tsx";
import { selectUserId, useGetUserPasswordStatusQuery } from "@/store";
import { selectUserRole, selectUsername } from "@/store/slices";

const AuthenticatedHeader: React.FC = () => {
  const username = useAppSelector(selectUsername);
  const role = useAppSelector(selectUserRole);
  const userId = useAppSelector(selectUserId);
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const { handleClose, open, handleOpen, anchorEl } = useMenu();
  const {
    anchorEl: accountAnchorEl,
    open: accountOpen,
    handleOpen: handleAccountOpen,
    handleClose: handleAccountClose,
  } = useMenu();

  const { data, isLoading } = useGetUserPasswordStatusQuery(userId);
  const passwordStatus = data?.status;

  useEffect(() => {
    if (passwordStatus === "Locked") {
      setModalOpen(true);
    }
  }, [passwordStatus]);

  if (!data) return null;
  if (isLoading) return <PageLoader />;

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
      {role !== userRoles.Administrator && passwordStatus === "Locked" && (
        <>
          <IconButton onClick={handleOpen}>
            <NotificationsActiveIcon color="error" />
          </IconButton>
          <NotificationMenu
            notificationText={t("users.statusLocked.text")}
            anchorEl={anchorEl}
            handleClose={handleClose}
            open={open}
          />
          <BasicModal
            isOpen={modalOpen}
            closeModal={() => setModalOpen(false)}
            title={t("users.statusLocked.title")}
            titleColor={"error"}
          >
            <Typography marginTop={4}>
              {t("users.statusLocked.text")}
            </Typography>
            <Link
              component={RouterLink}
              to={RouteProtectedPath.accountSettings}
              marginTop={5}
              onClick={() => setModalOpen(false)}
            >
              Account Settings
            </Link>
          </BasicModal>
        </>
      )}
    </Box>
  );
};

export default AuthenticatedHeader;
