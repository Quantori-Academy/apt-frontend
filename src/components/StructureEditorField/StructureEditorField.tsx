import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BasicModal, StructureEditor } from "@/components";
import { ReagentData } from "@/types";

type StructureEditorFieldProps = {
  register: UseFormRegister<ReagentData>;
  onChange: (newStructure: string) => void;
};

const StructureEditorField: React.FC<StructureEditorFieldProps> = ({
  register,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [smile, setSmile] = useState("");

  const handleStructureDone = () => {
    setIsOpen(false);
    onChange(smile);
  };

  const { t } = useTranslation();
  return (
    <>
      <TextField
        sx={{ marginTop: "16px" }}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        label={t("createRequestForm.requiredFields.structure.label")}
        {...register("structure")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Click To Draw Structure">
                <IconButton edge="end" onClick={() => setIsOpen(true)}>
                  <OpenInNewIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <BasicModal
        title={""}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        width="60%"
      >
        <Box height="400px">
          <StructureEditor onChange={(smile) => setSmile(smile)} />
        </Box>
        <Box
          sx={{
            margin: "4px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={handleStructureDone}>Done</Button>
        </Box>
      </BasicModal>
    </>
  );
};

export default StructureEditorField;
