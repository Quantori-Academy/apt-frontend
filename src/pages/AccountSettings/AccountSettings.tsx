import { Container, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AccountDetails, ResetPassword } from "@/components";
import { selectUserId } from "@/store";

const AccountSettings: React.FC = () => {
  const ownId = useSelector(selectUserId)!;
  const { userId } = useParams<{ userId: string }>();

  const id = userId ?? ownId;

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

      <AccountDetails userId={id} />
      <Divider sx={{ my: 2 }} />
      <ResetPassword userId={id} />
    </Container>
  );
};

export default AccountSettings;
