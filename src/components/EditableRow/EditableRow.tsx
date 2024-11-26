import { Box, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";

import { EditController } from "@/components";
import { EditableRowsProps } from "@/types";

type EditableRowProps<T extends FieldValues> = EditableRowsProps<T> & {
  label: string;
  isEditable?: boolean;
};

const EditableRow = <T extends FieldValues>({
  label,
  isEditable,
  ...commonProps
}: EditableRowProps<T>) => {
  const { value } = commonProps;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Typography fontWeight="bold" sx={{ minWidth: "50px" }}>
        {label}:
      </Typography>
      {isEditable ? (
        <EditController {...commonProps} />
      ) : (
        <Typography>{value || "-"}</Typography>
      )}
    </Box>
  );
};

export default EditableRow;
