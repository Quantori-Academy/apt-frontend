import { Container, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import {
  AccountDetails,
  DeleteUser,
  EditUserRole,
  ResetPassword,
} from "@/components";
import { getCurrentUserFromToken } from "@/utils";

const AccountSettings: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const currentUser = getCurrentUserFromToken();

  if (!currentUser) {
    return null;
  }

  const { id: currentUserId, role: currentUserRole } = currentUser;
  const id = userId || currentUserId;

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
      <Typography variant="h5" gutterBottom margin={3}>
        Account Details
      </Typography>
      <ResetPassword userId={id} />
      <Divider sx={{ my: 3 }} />
      <EditUserRole
        userId={id}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />
      <Divider sx={{ my: 3 }} />
      <AccountDetails userId={id} />
      <DeleteUser
        userId={id}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />
    </Container>
  );
};

export default AccountSettings;
