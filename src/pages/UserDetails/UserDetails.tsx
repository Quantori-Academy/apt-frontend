import { Container, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  AccountDetails,
  DashboardBreadcrumbs,
  DeleteUser,
  EditUserRole,
  PageError,
  ResetPassword,
} from "@/components";
import { useGetUserDetailsQuery } from "@/store";

const UserDetails: React.FC = () => {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();

  const { isError } = useGetUserDetailsQuery(id!);
  if (!id) return null;
  if (isError)
    return <PageError text={t("userDetails.snackBarMessages.noUser")} />;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        width: 600,
        margin: "auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        mt: 8,
        bgcolor: "white",
      }}
    >
      <DashboardBreadcrumbs />
      <Typography variant="h3" gutterBottom margin={3}>
        {t("userDetails.title")}
      </Typography>
      <ResetPassword isAccountPassword={false} userId={id} />
      <Divider sx={{ my: 3 }} />
      <EditUserRole userId={id} />
      <Divider sx={{ my: 3 }} />
      <AccountDetails userId={id} />
      <DeleteUser userId={id} />
    </Container>
  );
};

export default UserDetails;
