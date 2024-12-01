import { SubstancesDetails, SubstancesResponse } from "@/types";

export const transformSubstanceData = (substances: SubstancesResponse): Array<SubstancesDetails> => {
  return substances.map((substance) => {
    return {
      id: String(substance.id),
      category: substance.category,
      description: substance.description || "",
      name: substance.name,
      structure: substance.structure || "",
      unit: substance.unit || "",
      isExpired: substance.is_expired,
      quantityLeft: `${substance.location.quantity_left} ${substance.location.unit}`,
      storageLocation: `${substance.location.room} / ${substance.location.location}`,
    };
  });
};
