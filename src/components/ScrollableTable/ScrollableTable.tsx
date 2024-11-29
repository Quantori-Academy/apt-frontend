import { Paper, Table, TableContainer } from "@mui/material";
import type { ReactNode } from "react";

import styles from "./ScrollableTable.module.css";

type ScrollableTableProps = {
  size?: "small" | "medium";
  children: ReactNode;
  paginationComponent: ReactNode;
};

const ScrollableTable: React.FC<ScrollableTableProps> = ({
  size = "medium",
  children,
  paginationComponent,
}) => {
  return (
    <Paper>
      <TableContainer
        sx={{
          maxHeight: 400,
        }}
        className={styles.customScrollbar}
      >
        <Table aria-label="simple table" stickyHeader size={size}>
          {children}
        </Table>
      </TableContainer>
      {paginationComponent}
    </Paper>
  );
};

export default ScrollableTable;
