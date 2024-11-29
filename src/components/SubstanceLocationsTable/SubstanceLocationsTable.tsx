import { Edit, MoveUp } from "@mui/icons-material";
import {
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ScrollableTable, SubstanceLocationChangingForm } from "@/components";
import { userRoles } from "@/constants";
import { useAppSelector } from "@/hooks";
import { selectUserRole } from "@/store";
import {
  LocationChangingIds,
  ReagentLocation,
  SubstancesCategory,
} from "@/types";

type SubstanceLocationsTableProps = {
  substanceType: SubstancesCategory;
  locations: ReagentLocation[];
};

const SubstanceLocationsTable: React.FC<SubstanceLocationsTableProps> = ({
  substanceType,
  locations,
}) => {
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [locationIdsToChange, setLocationIdsToChange] =
    useState<LocationChangingIds>({
      storageContentId: null,
      currentLocationId: null,
    });

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = locations.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - locations.length) : 0;

  const showPagination = locations.length > 5;

  return (
    <>
      <ScrollableTable
        size="small"
        paginationComponent={
          showPagination ? (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={locations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={t("orders.table.Pagination.RowsPerPage")}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${t("orders.table.Pagination.of")} ${count !== -1 ? count : `${t("orders.table.Pagantion.moreThan")} ${to}`}`
              }
            />
          ) : null
        }
      >
        <TableHead>
          <TableRow>
            <TableCell>{t("substances.table.storageLocation")}</TableCell>
            <TableCell align="right">
              {t("substances.table.quantityLeft")}
            </TableCell>
            {substanceType === "Reagent" && (
              <TableCell align="right">
                {t("substanceDetails.fields.price")}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((location) => (
            <SubstanceLocationTableRow
              key={location.contentId}
              substanceType={substanceType}
              {...location}
              onClickChangeLocation={() =>
                setLocationIdsToChange({
                  storageContentId: location.contentId,
                  currentLocationId: location.locationId,
                })
              }
            />
          ))}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 33 * emptyRows,
              }}
            >
              <TableCell colSpan={5} />
            </TableRow>
          )}
        </TableBody>
      </ScrollableTable>
      {locationIdsToChange.currentLocationId && (
        <SubstanceLocationChangingForm
          locationIdsToChange={locationIdsToChange}
          substanceType={substanceType}
          onCancel={() =>
            setLocationIdsToChange({
              storageContentId: null,
              currentLocationId: null,
            })
          }
        />
      )}
    </>
  );
};

export default SubstanceLocationsTable;

type SubstanceLocationTableRowProps = ReagentLocation & {
  substanceType?: SubstancesCategory;
  onClickChangeLocation: () => void;
};

const SubstanceLocationTableRow: React.FC<SubstanceLocationTableRowProps> = ({
  substanceType = "Reagent",
  location,
  room,
  quantityLeft,
  pricePerUnit,
  onClickChangeLocation,
}) => {
  const role = useAppSelector(selectUserRole);
  const isResearcher = role === userRoles.Researcher;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        {isResearcher && (
          <Tooltip placement="top" title="Change reagent's location">
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
          <Tooltip placement="top" title="Change  reagent's quantity">
            <IconButton>
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
