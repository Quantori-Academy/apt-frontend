import { Container, Divider, Typography } from "@mui/material";

import { AccountDetails } from "@/components";
import { useAppSelector } from "@/hooks";
import { selectUserId, selectUserRole } from "@/store";

const AccountSettings: React.FC = () => {
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
        mt: 8,
        bgcolor: "white",
      }}
    >
      <Typography variant="h3" gutterBottom margin={3}>
        Account Details
      </Typography>
      <Typography variant="h6" gutterBottom marginX={3}>
        User Role: {userRole}
      </Typography>
      <Divider sx={{ my: 3 }} />
      <AccountDetails userId={userId} />
    </Container>
  );
};

export default AccountSettings;
