import { Container } from "@mui/material";
import type { PropsWithChildren } from "react";

import styles from "./index.module.css";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.pageLayout}>
      <Container>{children}</Container>
    </main>
  );
};

export default PageLayout;
