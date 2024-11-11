import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Box, IconButton, Typography } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/hooks";
import { selectUserRole, selectUsername } from "@/store/slices";

type AuthenticatedHeaderProps = {
  onOpenMenu: (event: React.MouseEvent<HTMLElement>) => void | null;
};

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({
  onOpenMenu,
}) => {
  const { t } = useTranslation();
  const username = useAppSelector(selectUsername);
  const role = useAppSelector(selectUserRole);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography>{t(`users.roles.${role}`)}</Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        margin={3}
        textAlign="center"
      >
        <IconButton
          color="inherit"
          sx={{ padding: 0 }}
          onClick={(e) => onOpenMenu(e)}
        >
          <PermIdentityIcon
            sx={{
              width: 40,
              height: 40,
              border: "2px solid white",
              borderRadius: "50%",
              padding: "5px",
            }}
          />
        </IconButton>
        <Typography textAlign="center">{username}</Typography>
      </Box>
    </Box>
  );
};

export default AuthenticatedHeader;
