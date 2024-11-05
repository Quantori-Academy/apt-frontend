import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LinkIcon from "@mui/icons-material/Link";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { OrderDetailRow } from "@/components";
import { OrderReagent } from "@/types";

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

type expand = string | false;

type OrderReagentDetailsProps = {
  reagent: OrderReagent;
  expanded: expand;
  setExpanded: (value: expand) => void;
};

const OrderReagentDetails: React.FC<OrderReagentDetailsProps> = ({
  reagent,
  expanded,
  setExpanded,
}) => {
  const { t } = useTranslation();

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
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
                      {t("addSubstanceForm.requiredFields.catalogLink.label")}
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
      <AccordionActions sx={{ padding: "0px 16px 16px" }}>
        <Button>Cancel</Button>
        <Button>Agree</Button>
      </AccordionActions>
    </Accordion>
  );
};
export default OrderReagentDetails;
