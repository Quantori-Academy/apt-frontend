import { Container } from "@mui/material";

import { LoginForm } from "@/components";
import { useRoleNavigation } from "@/hooks";

const Login: React.FC = () => {
  useRoleNavigation();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoginForm />
    </Container>
  );
};

export default Login;
