import { Container, Divider, Typography } from "@mui/material";

import { ResetPassword } from "@/components";
import { AccountDetails } from "@/components/AccountDetails";

const AccountSettings: React.FC = () => {
  return (
    <Container
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        mt: 8,
        bgcolor: "white",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Account Details
      </Typography>
      <ResetPassword />
      <Divider sx={{ my: 2 }} />
      <AccountDetails />
    </Container>
  );
};

export default AccountSettings;
