import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";

type TabPanelProps = PropsWithChildren & {
  index: number;
  value: number;
};

const CustomTabPanel: React.FC<TabPanelProps> = ({
  value,
  index,
  children,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default CustomTabPanel;
