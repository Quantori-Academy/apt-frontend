import { TFunction } from "i18next";

type QuantityValidation = {
  value: string;
  currentQuantity: string;
  t: TFunction;
};

export const validateQuantity = ({ value, currentQuantity, t }: QuantityValidation): true | string => {
  const newQuantity = parseFloat(value);
  const currentQty = parseFloat(currentQuantity);
  if (isNaN(newQuantity)) {
    return t("substanceDetails.quantityValidation.invalidNumber");
  }
  if (newQuantity < 0) {
    return t("substanceDetails.quantityValidation.greaterThanZero");
  }
  if (newQuantity >= currentQty) {
    return t("substanceDetails.quantityValidation.lessThanCurrent", {
      currentQuantity,
    });
  }
  return true;
};
