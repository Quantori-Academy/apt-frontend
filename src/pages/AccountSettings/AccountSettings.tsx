import { Container, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { AccountDetails, ResetPassword } from "@/components";
import { useAppSelector } from "@/hooks";
import { selectUserId, selectUserRole } from "@/store";

const AccountSettings: React.FC = () => {
  const { t } = useTranslation();

  const userId = useAppSelector(selectUserId);
  const userRole = useAppSelector(selectUserRole);

  if (!userId || !userRole) return null;

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
        marginTop: 8,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h3" margin={1}>
        {t("userDetails.title")}
      </Typography>
      <Typography variant="h6" gutterBottom marginX={3}>
        {t("users.table.role")}: {t(`users.roles.${userRole}`)}
      </Typography>
      <Divider sx={{ my: 3 }} />
      <ResetPassword isAccountPassword={true} userId={userId} />
      <Divider sx={{ my: 3 }} />

      <AccountDetails userId={userId} />
    </Container>
  );
};

export default AccountSettings;
