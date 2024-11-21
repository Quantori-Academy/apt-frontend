import { Menu, Typography } from "@mui/material";

type NotificationMenuProps = {
  notificationText: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
};

const NotificationMenu: React.FC<NotificationMenuProps> = ({
  notificationText,
  anchorEl,
  open,
  handleClose,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            padding: "20px",
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
              backgroundColor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Typography>{notificationText}</Typography>
    </Menu>
  );
};

export default NotificationMenu;
