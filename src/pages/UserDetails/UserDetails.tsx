import { Container, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import {
  AccountDetails,
  DeleteUser,
  EditUserRole,
  ResetPassword,
} from "@/components";
import { PageError } from "@/components/PageError";
import { useGetUserDetailsQuery } from "@/store";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { isError } = useGetUserDetailsQuery(id!);
  if (!id) return null;
  if (isError) return <PageError text="No user found with the specified ID" />;

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
      <EditUserRole userId={id} />
      <Divider sx={{ my: 3 }} />
      <AccountDetails userId={id} />
      <DeleteUser userId={id} />
    </Container>
  );
};

export default UserDetails;
