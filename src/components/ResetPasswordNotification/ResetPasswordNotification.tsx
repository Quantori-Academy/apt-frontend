import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { IconButton, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import { BasicModal, CustomMenu, PageLoader } from "@/components";
import { useAppSelector, useMenu } from "@/hooks";
import { RouteProtectedPath } from "@/router";
import { selectUserId, useGetUserPasswordStatusQuery } from "@/store";

const ResetPasswordNotification: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const userId = useAppSelector(selectUserId);

  const { t } = useTranslation();

  const { handleClose, open, handleOpen, anchorEl } = useMenu();
  const { data, isLoading } = useGetUserPasswordStatusQuery(userId);

  const passwordStatus = data?.status;

  useEffect(() => {
    if (passwordStatus === "Password Reset") {
      setModalOpen(true);
    }
  }, [passwordStatus]);

  if (!data) return null;
  if (isLoading) return <PageLoader />;

  return (
    <>
      {passwordStatus === "Password Reset" && (
        <>
          <IconButton onClick={handleOpen}>
            <NotificationsActiveIcon color="error" />
          </IconButton>
          <CustomMenu
            title={t("users.statusResetPassword.text")}
            anchorEl={anchorEl}
            handleClose={handleClose}
            open={open}
          />
          <BasicModal
            isOpen={modalOpen}
            closeModal={() => setModalOpen(false)}
            title={t("users.statusResetPassword.title")}
            titleColor={"error"}
          >
            <Typography margin={4}>
              {t("users.statusResetPassword.text")}
            </Typography>
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

export default ResetPasswordNotification;
