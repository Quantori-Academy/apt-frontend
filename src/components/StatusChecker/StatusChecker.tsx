import { Box, Button } from "@mui/material";
import { useState } from "react";

import { apiManager } from "@/api";

/*
 * Example component can be deleted.
 */
const StatusChecker: React.FC = () => {
  const [serverStatus, setServerStatus] = useState("Unknown");

  const checkServerStatus = async () => {
    setServerStatus("Pending...");

    try {
      const response = await apiManager.getApiStatus();
      setServerStatus(response.status);
    } catch (error) {
      console.error(error);
      setServerStatus("Fetch Failed");
    }
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={1}>
      <Button onClick={checkServerStatus}>Check server status</Button>
      <Box textAlign={"center"}>{serverStatus}</Box>
    </Box>
  );
};

export default StatusChecker;
