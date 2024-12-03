import { TFunction } from "i18next";

export const decimalFormatter = (value: string) => {
  let res = value.replace(/[^0-9.]/g, "");
  const parts = value.split(".");

  if (parts.length > 2) return "";

  if (parts[1]) {
    parts[1] = parts[1].slice(0, 2);
  }

  res = parts.join(".");
  return res;
};

type ValidationRulesArgs = {
  key: string;
  t: TFunction;
};

export const getValidationRules = ({ key, t }: ValidationRulesArgs) => {
  const rules = {
    required: t(`createOrderForm.requiredFields.${key}.requiredMessage`),
    validate: {},
  };

  if (key === "amount") {
    rules.validate = {
      integerValidation: (value: string) => Number.isInteger(Number(value)),
      minimumValue: (value: string) => Number(value) >= 1,
    };
  } else if (key === "pricePerUnit" || key === "quantity") {
    rules.validate = {
      minimumValue: (value: string) => Number(value) >= 0.01,
    };
  }

  return rules;
};
