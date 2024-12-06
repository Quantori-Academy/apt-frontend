import { Edit, MoveUp } from "@mui/icons-material";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { t } from "i18next";

import { userRoles } from "@/constants";
import { useAppSelector } from "@/hooks";
import { selectUserRole } from "@/store";
import { ReagentLocation, SubstancesCategory } from "@/types";

type SubstanceLocationTableRowProps = ReagentLocation & {
  substanceType?: SubstancesCategory;
  onClickChangeLocation: () => void;
  onClickChangeQuantity: () => void;
};

export const SubstanceLocationTableRow: React.FC<
  SubstanceLocationTableRowProps
> = ({
  substanceType = "Reagent",
  location,
  room,
  quantityLeft,
  pricePerUnit,
  onClickChangeLocation,
  onClickChangeQuantity,
}) => {
  const role = useAppSelector(selectUserRole);
  const isResearcher = role === userRoles.Researcher;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        {isResearcher && (
          <Tooltip
            placement="top"
            title={t(`substanceDetails.title.changeLocation${substanceType}`)}
          >
            <IconButton onClick={onClickChangeLocation}>
              <MoveUp />
            </IconButton>
          </Tooltip>
        )}
        {`${room}, ${location}`}{" "}
      </TableCell>
      <TableCell align="right">
        {quantityLeft}
        {isResearcher && (
          <Tooltip
            placement="top"
            title={t(`substanceDetails.title.changeQuantity${substanceType}`)}
          >
            <IconButton onClick={onClickChangeQuantity}>
              <Edit />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
      {substanceType === "Reagent" && (
        <TableCell align="right">{pricePerUnit || "-"}</TableCell>
      )}
    </TableRow>
  );
};
