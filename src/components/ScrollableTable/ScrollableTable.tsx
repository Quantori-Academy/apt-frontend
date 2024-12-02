import { Paper, Table, TableContainer } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

import styles from "./ScrollableTable.module.css";

type ScrollableTableProps = PropsWithChildren & {
  paginationComponent: ReactNode;
  size?: "small" | "medium";
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
