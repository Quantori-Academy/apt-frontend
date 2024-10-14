import { Container } from "@mui/material";

import { LoginForm } from "@/components";

const Login: React.FC = () => {
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
