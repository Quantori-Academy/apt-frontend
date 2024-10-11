import { Container, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import {
  AccountDetails,
  DeleteUser,
  EditUserRole,
  ResetPassword,
} from "@/components";
import { useAppSelector } from "@/hooks";
import { selectUserId, selectUserRole } from "@/store";

const AccountSettings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const currentUserId = useAppSelector(selectUserId);
  const currentUserRole = useAppSelector(selectUserRole);

  if (!currentUserId || !currentUserRole) return null;

  const currentId = (id || currentUserId)!;

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
      <ResetPassword userId={currentId} />
      <Divider sx={{ my: 3 }} />
      <EditUserRole
        userId={currentId}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />
      <Divider sx={{ my: 3 }} />
      <AccountDetails userId={currentId} />
      <DeleteUser
        userId={currentId}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />
    </Container>
  );
};

export default AccountSettings;
