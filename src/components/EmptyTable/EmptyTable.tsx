import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type EmptyTableProps = {
  tableName: string;
};

const EmptyTable: React.FC<EmptyTableProps> = ({ tableName }) => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="50vh"
      sx={{ textAlign: "center", color: "grey.500" }}
    >
      <WarningAmberIcon sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h6">{t(`emptyList.${tableName}`)}</Typography>
    </Box>
  );
};

export default EmptyTable;
