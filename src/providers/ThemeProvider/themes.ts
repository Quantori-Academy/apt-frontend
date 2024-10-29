import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme();

export const appTheme = createTheme({
  typography: {
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
      color: "#004d40",
    },
  },
  shape: {
    borderRadius: 8,
  },
  palette: {
    mode: "light",
    background: {
      default: "#F5F7FD",
    },
    primary: {
      main: "#00695f",
    },
    secondary: {
      main: "#33ab9f",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "1px solid #C6CED8",
          padding: "10px 20px",
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: "24px",
          textTransform: "none",
          color: "#173348",
          backgroundColor: "#FFFFFF",
          boxShadow: "none",

          "&.MuiButton-contained": {},
          "&.MuiButton-outlined": {},

          "&:hover": {
            backgroundColor: "#EFF1F4",
            boxShadow: "none",
          },
          "&:active": {
            backgroundColor: "#DEE3E9",
            boxShadow: "none",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          ".MuiInput-root": {
            backgroundColor: "#FFFFFF",
            paddingLeft: "14px",
            paddingRight: "12px",
            border: "1px solid #FFFFFF",
            borderRadius: 8,

            "&:hover": {
              borderColor: "#C6CED8",
            },
            "&.Mui-focused": {
              borderColor: "#2977FF",
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          "& .MuiFormControlLabel-label": {
            fontSize: "14px",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          color: "#54687D",

          "&.Mui-focused": {
            color: "#54687D",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            fontSize: "14px",
          },
          ".MuiFilledInput-root": {
            backgroundColor: "#FFFFFF",
            border: "1px solid #F7F8F9",
            borderRadius: 8,

            "&:hover": {
              backgroundColor: "#FFFFFF",
              borderColor: "#C6CED8",
            },
            "&.Mui-focused": {
              backgroundColor: "#FFFFFF",
              borderColor: "#2977FF",
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          "&.MuiTableCell-head": {
            backgroundColor: "#EFF1F4",
            color: "#54687D",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          ".MuiSvgIcon-root": {
            color: "#C6CED8",
          },
          "&.Mui-checked": {
            ".MuiSvgIcon-root": {
              color: "#2977FF",
            },
          },
        },
      },
    },
  },
});
