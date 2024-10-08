import { Login } from "@mui/icons-material";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { RevealableField } from "@/components";
import { useAppSelector, useLoginForm, useRoleNavigation } from "@/hooks";
import { selectErrorMessage, selectLoading } from "@/store/slices/authSlice";

const LoginForm: React.FC = () => {
  const errorMessage = useAppSelector(selectErrorMessage);
  const isLoading = useAppSelector(selectLoading);

  const { register, handleSubmit, requiredErrors } = useLoginForm();

  useRoleNavigation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "15px",
        maxWidth: 300,
        width: "100%",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        sx={{ width: "100%" }}
        error={!!requiredErrors.username}
        label="Username"
        type="text"
        variant="outlined"
        size="small"
        {...register("username", {
          required: "Username is required!",
        })}
        helperText={
          requiredErrors.username?.message ? "Username is required!" : ""
        }
      />
      <RevealableField
        name="password"
        label="Password"
        register={register}
        error={requiredErrors.password}
        options={{ required: "Password is required!" }}
      />
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}

      {isLoading ? (
        <div>
          <CircularProgress size="35px" />
        </div>
      ) : (
        <Button
          type="submit"
          variant="outlined"
          size="small"
          sx={{ display: "flex", gap: "3px" }}
        >
          <Typography variant="body1" component="span">
            Login
          </Typography>{" "}
          <Login />
        </Button>
      )}
    </Box>
  );
};

export default LoginForm;
