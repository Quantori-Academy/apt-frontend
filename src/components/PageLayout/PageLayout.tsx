import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Header } from "../Header";

import styles from "./index.module.css";

const PageLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className={styles.pageLayout}>
        <Container sx={{ height: "100%" }}>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default PageLayout;
