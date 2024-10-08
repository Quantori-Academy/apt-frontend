import { Container, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { ResetPassword } from "@/components";
import { AccountDetails } from "@/components/AccountDetails";
import { selectUserId } from "@/store/slices/authSlice.ts";

const AccountSettings: React.FC = () => {
  const [isOwnAccount, setIsOwnAccount] = useState(false);
  const location = useLocation();
  const ownId: string = useSelector(selectUserId)!;
  const { userId } = useParams<{ userId: string }>();
  const id: string | undefined = isOwnAccount ? ownId : userId;

  useEffect(() => {
    if (location.pathname === "/account-settings") {
      setIsOwnAccount(true);
    } else if (location.pathname.startsWith("/users/") && userId) {
      setIsOwnAccount(false);
    }
  }, [location, userId]);

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
      <Divider sx={{ my: 2 }} />
      <AccountDetails userId={id} />
    </Container>
  );
};

export default AccountSettings;
