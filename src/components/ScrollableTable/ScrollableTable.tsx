import { Paper, Table, TableContainer } from "@mui/material";
import { ReactNode } from "react";

import styles from "./ScrollableTable.module.css";

type ScrollableTableProps = {
  children: ReactNode;
  paginationComponent: ReactNode;
};

const ScrollableTable: React.FC<ScrollableTableProps> = ({
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
        <Table aria-label="simple table" stickyHeader>
          {children}
        </Table>
      </TableContainer>
      {paginationComponent}
    </Paper>
  );
};

export default ScrollableTable;
