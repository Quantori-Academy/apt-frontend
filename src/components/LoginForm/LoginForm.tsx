import { Login } from "@mui/icons-material";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

import { RevealableField } from "@/components";
import { useAppSelector, useLoginForm } from "@/hooks";
import { selectErrorMessage, selectLoading } from "@/store";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();

  const errorMessage = useAppSelector(selectErrorMessage);
  const isLoading = useAppSelector(selectLoading);

  const { register, handleSubmit, requiredErrors } = useLoginForm();

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
        label={t("addUserForm.requiredFields.username.label")}
        type="text"
        variant="outlined"
        size="small"
        {...register("username", {
          required: t("addUserForm.requiredFields.username.requiredMessage"),
        })}
        helperText={requiredErrors.username?.message}
      />
      <RevealableField
        name="password"
        label={t("addUserForm.requiredFields.password.label")}
        register={register}
        error={requiredErrors.password}
        options={{
          required: t("addUserForm.requiredFields.password.requiredMessage"),
        }}
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
            {t("buttons.login")}
          </Typography>{" "}
          <Login />
        </Button>
      )}
    </Box>
  );
};

export default LoginForm;
