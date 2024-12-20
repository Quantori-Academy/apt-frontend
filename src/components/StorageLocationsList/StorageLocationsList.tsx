import {
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { userRoles } from "@/constants";
import { useAppSelector } from "@/hooks";
import { RouteProtectedPath } from "@/router";
import { selectUserRole } from "@/store";
import { StorageRoomsBrief } from "@/types";

type StorageLocationsListProps = {
  storages: Array<StorageRoomsBrief>;
  onEditRoom: (id: string) => void;
};

const StorageLocationsList: React.FC<StorageLocationsListProps> = ({
  storages,
  onEditRoom,
}) => {
  const { t } = useTranslation();

  const role = useAppSelector(selectUserRole);

  const navigate = useNavigate();

  const handleLocationClick = (locationId: string) => {
    navigate(
      RouteProtectedPath.storageLocationDetail.replace(
        ":locationId",
        `${locationId}`
      )
    );
  };

  return (
    <List>
      {storages.map((room: StorageRoomsBrief) => (
        <Card
          key={room.id}
          style={{
            marginBottom: "20px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              {room.room}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {room.description}
            </Typography>

            <Typography
              variant="subtitle1"
              style={{ marginTop: "10px", fontWeight: 600 }}
            >
              {t("storage.fields.locations")}
            </Typography>
            <List
              style={{
                paddingLeft: "20px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {room.locations.map((location) => (
                <ListItem key={location.locationId} disablePadding>
                  <ListItemButton
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      marginBottom: "8px",
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    onClick={() => handleLocationClick(location.locationId)}
                  >
                    <Typography variant="body2" color="textPrimary">
                      {location.locationName}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Divider style={{ margin: "10px 0" }} />
            <Typography variant="body2" color="textSecondary">
              {`${t("storage.fields.totalSubstances")} ${room.totalSubstances}`}
            </Typography>

            {role === userRoles.Administrator && (
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
                onClick={() => onEditRoom(room.id)}
              >
                {t("storage.buttons.editRoom")}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </List>
  );
};

export default StorageLocationsList;
