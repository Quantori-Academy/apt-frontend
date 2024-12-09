import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { type ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  ScrollableTable,
  SubstanceLocationChangingForm,
  SubstanceQuantityChangingForm,
} from "@/components";
import {
  LocationChangingIds,
  ReagentLocation,
  SubstancesCategory,
} from "@/types";

import { SubstanceLocationTableRow } from "./SubstanceLocationTableRow";

type QuantityChangingType = {
  storageContentId: number | null;
  currentQuantity: string;
};

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

  const [quantityIdToChange, setQuantityIdToChange] =
    useState<QuantityChangingType>({
      storageContentId: null,
      currentQuantity: "",
    });

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onCancelChangingLocation = () => {
    setLocationIdsToChange({
      storageContentId: null,
      currentLocationId: null,
    });
  };

  const onCancelChangingQuantity = () => {
    setQuantityIdToChange({
      storageContentId: null,
      currentQuantity: "",
    });
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
                `${from}-${to} ${t("orders.table.Pagination.of")} ${count !== -1 ? count : `${t("orders.table.Pagination.moreThan")} ${to}`}`
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
              onClickChangeQuantity={() =>
                setQuantityIdToChange({
                  storageContentId: location.contentId,
                  currentQuantity: location.quantityLeft,
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
          onCancel={onCancelChangingLocation}
        />
      )}
      {quantityIdToChange.storageContentId && (
        <SubstanceQuantityChangingForm
          storageContentId={quantityIdToChange.storageContentId}
          currentQuantity={quantityIdToChange.currentQuantity}
          substanceType={substanceType}
          onCancel={onCancelChangingQuantity}
        />
      )}
    </>
  );
};

export default SubstanceLocationsTable;
