import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { IconButton, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import { BasicModal, NotificationMenu, PageLoader } from "@/components";
import { userRoles } from "@/constants";
import { useAppSelector, useMenu } from "@/hooks";
import { RouteProtectedPath } from "@/router";
import {
  selectUserId,
  selectUserRole,
  useGetUserPasswordStatusQuery,
} from "@/store";

const UserStatusLocked: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const role = useAppSelector(selectUserRole);
  const userId = useAppSelector(selectUserId);

  const { t } = useTranslation();

  const { handleClose, open, handleOpen, anchorEl } = useMenu();
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
    <>
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
            <Typography margin={4}>{t("users.statusLocked.text")}</Typography>
            <Link
              component={RouterLink}
              to={RouteProtectedPath.accountSettings}
              onClick={() => setModalOpen(false)}
            >
              {t("header.accountSettings")}
            </Link>
          </BasicModal>
        </>
      )}
    </>
  );
};

export default UserStatusLocked;
