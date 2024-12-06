import { SubstancesDetails, SubstancesResponse } from "@/types";

export const transformSubstanceData = (substances: SubstancesResponse): Array<SubstancesDetails> => {
  const currentDate = new Date();

  return substances.map((substance) => {
    const expirationDate = new Date(substance.expiration_date);
    return {
      id: String(substance.id),
      category: substance.category,
      description: substance.description || "",
      name: substance.name,
      structure: substance.structure || "",
      unit: substance.unit || "",
      isExpired: substance.expiration_date ? expirationDate < currentDate : false,
      expirationDate: substance.expiration_date || "",
      quantityLeft: `${substance.location.quantity_left} ${substance.location.unit}`,
      storageLocation: `${substance.location.room} / ${substance.location.location}`,
    };
  });
};
