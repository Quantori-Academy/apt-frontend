import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LinkIcon from "@mui/icons-material/Link";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  DetailItem,
  OrderDetailRow,
  PageError,
  PageLoader,
} from "@/components";
import { useGetOrderQuery } from "@/store";
import { Order, OrderReagent } from "@/types";
import { formatDate } from "@/utils";

type OrderRow = {
  label: string;
  key: keyof Order;
};

const OrderRows: readonly OrderRow[] = [
  { label: "Title", key: "title" },
  { label: "Seller", key: "seller" },
  { label: "Status", key: "status" },
  { label: "Creation Date", key: "createdAt" },
  { label: "Modified Date", key: "modifiedAt" },
];

type OrderReagentRow = {
  label: string;
  key: keyof OrderReagent;
};

const OrderReagentMainRows: readonly OrderReagentRow[] = [
  { label: "name", key: "reagentName" },
  { label: "quantity", key: "quantity" },
  { label: "unit", key: "unit" },
  { label: "pricePerUnit", key: "pricePerUnit" },
];

const OrderReagentSecondaryRows: readonly OrderReagentRow[] = [
  { label: "CASNumber", key: "CASNumber" },
  { label: "producer", key: "producer" },
  { label: "catalogID", key: "catalogId" },
];

const OrderPage: React.FC = () => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState<string | false>("panel1");
  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const { id: orderId } = useParams<{ id: string }>();

  const {
    data: order,
    isLoading: isOrderLoading,
    isError,
  } = useGetOrderQuery(orderId ? orderId : skipToken);

  if (isOrderLoading) {
    return <PageLoader />;
  }

  if (!order || !orderId || isError) {
    return <PageError text={t("orders.errors.detailedOrderError")} />;
  }

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {t("orders.title.DetailPage")}
      </Typography>
      <Box display="flex" flexDirection="column" marginBottom={2}>
        {OrderRows.map(({ label, key }) => (
          <DetailItem
            key={key}
            label={t(`orders.table.${label}`)}
            value={
              key === "createdAt" || key === "modifiedAt"
                ? formatDate(order[key as keyof Order])
                : key === "status"
                  ? t(`orders.statuses.${order[key as keyof Order]}`)
                  : order[key as keyof Order] || "-"
            }
          />
        ))}
      </Box>
      <Divider style={{ margin: "16px 0" }} />

      {order.orderedReagents.map((reagent) => (
        <Accordion
          sx={{
            boxShadow: `0px -1px 1px #00695f, 0px 1px 3px #00695f`,
          }}
          expanded={expanded === reagent.reagentName + reagent.quantity}
          onChange={handleChange(reagent.reagentName + reagent.quantity)}
          key={reagent.id}
        >
          <AccordionSummary
            id={`${reagent.reagentName + reagent.quantity}`}
            expandIcon={<ArrowDropDownIcon />}
          >
            {t("substances.filters.options.Reagent")}: {reagent.reagentName}
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {OrderReagentMainRows.map(({ label, key }) => (
                    <OrderDetailRow
                      key={key}
                      label={t(`substanceDetails.fields.${label}`)}
                      value={reagent[key as keyof OrderReagent]}
                    />
                  ))}

                  {OrderReagentSecondaryRows.map(({ label, key }) => (
                    <OrderDetailRow
                      key={key}
                      label={t(`substanceDetails.fields.${label}`)}
                      value={reagent[key as keyof OrderReagent]}
                    />
                  ))}
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">
                        {t("substanceDetails.fields.catalogLink")}:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {reagent.catalogLink !== undefined ? (
                        <Link
                          href={reagent.catalogLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="hover"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <LinkIcon sx={{ mr: 1 }} />{" "}
                          {t(
                            "addSubstanceForm.requiredFields.catalogLink.label"
                          )}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default OrderPage;
