import { Container } from "@mui/material";
import type { PropsWithChildren } from "react";

import { useToken } from "@/hooks";

import { Header } from "../Header";
import { LoadingPage } from "../LoadingPage";

import styles from "./index.module.css";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const isLoading = useToken();

  if (isLoading) {
    return <LoadingPage />;
  }

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
