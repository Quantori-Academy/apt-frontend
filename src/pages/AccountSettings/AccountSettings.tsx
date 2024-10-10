import { Container, Divider, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { EditUserRole, ResetPassword } from "@/components";
import { AccountDetails } from "@/components/AccountDetails";
import { selectUserId } from "@/store/slices/authSlice.ts";

const AccountSettings: React.FC = () => {
  const ownId = useSelector(selectUserId)!;
  const { userId } = useParams<{ userId: string }>();

  const id = ownId ?? userId;

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
      <ResetPassword userId={id} />
      <Divider sx={{ my: 3 }} />
      <EditUserRole userId={id} />
      <Divider sx={{ my: 3 }} />
      <AccountDetails userId={id} />
    </Container>
  );
};

export default AccountSettings;
