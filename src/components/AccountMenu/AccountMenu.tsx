import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { Menu, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout, selectUserRole } from "@/store";

import style from "./AccountMenu.module.css";

type AccountMenuProps = {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
};

const AccountMenu: React.FC<AccountMenuProps> = ({
  anchorEl,
  open,
  onClose,
}) => {
  const role = useAppSelector(selectUserRole);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    onClose();
    dispatch(logout());
  };
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={onClose}
        onClick={onClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography sx={{ textAlign: "center", padding: "10px" }}>
          {role}
        </Typography>

        <Divider />
        <Link to="/account-settings" className={style.link}>
          <MenuItem onClick={onClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Account Settings
          </MenuItem>
        </Link>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
