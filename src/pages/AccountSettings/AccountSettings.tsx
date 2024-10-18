import { Container, Divider } from "@mui/material";
import { useParams } from "react-router-dom";

import {
  AccountDetails,
  DeleteUser,
  EditUserRole,
  ResetPassword,
} from "@/components";
import { userRoles } from "@/constants";
import { useAppSelector } from "@/hooks";
import { selectUserId, selectUserRole } from "@/store";

const AccountSettings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const loggedInUserId = useAppSelector(selectUserId);
  const loggedInUserRole = useAppSelector(selectUserRole);
  //Ask Anahit(Fast Fix, ask Anahit after Demo)

  // if (isError) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         height: "100%",
  //       }}
  //     >
  //       <Typography variant="h2">User not found!</Typography>
  //     </Box>
  //   );
  // }

  if (!loggedInUserId || !loggedInUserRole) return null;

  const choosenId = (id || loggedInUserId)!;

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
      {loggedInUserRole === userRoles.Administrator && (
        <ResetPassword userId={choosenId} />
      )}
      <Divider sx={{ my: 3 }} />
      <EditUserRole
        userId={choosenId}
        currentUserId={loggedInUserId}
        currentUserRole={loggedInUserRole}
      />
      <Divider sx={{ my: 3 }} />
      <AccountDetails userId={choosenId} />
      <DeleteUser
        userId={choosenId}
        currentUserId={loggedInUserId}
        currentUserRole={loggedInUserRole}
      />
    </Container>
  );
};

export default AccountSettings;
