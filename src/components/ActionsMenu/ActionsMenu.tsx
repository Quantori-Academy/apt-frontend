import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import { ListItem, Menu } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

import style from "./ActionsMenu.module.css";

type ActionsMenuProps = {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
};

const ActionsMenu: React.FC<ActionsMenuProps> = ({
  anchorEl,
  open,
  onClose,
}) => {
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
        <Link to="/reagent-sample-list/:id" className={style.link}>
          <MenuItem onClick={onClose}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItem>Edit</ListItem>
          </MenuItem>
        </Link>
        <Link to="/reagent-sample-list/:id" className={style.link}>
          <MenuItem onClick={onClose}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItem>View Details</ListItem>
          </MenuItem>
        </Link>
        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItem>Delete</ListItem>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionsMenu;
