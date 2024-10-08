import { Container } from "@mui/material";
import React from "react";

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
      <AccountDetails />
    </Container>
  );
};

export default AccountSettings;
