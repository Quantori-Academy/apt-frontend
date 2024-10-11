import { Container } from "@mui/material";
import type { PropsWithChildren } from "react";

import { useToken } from "@/hooks";

import { Header } from "../Header";

import styles from "./index.module.css";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  useToken();
  return (
    <>
      <Header />
      <main className={styles.pageLayout}>
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default PageLayout;
