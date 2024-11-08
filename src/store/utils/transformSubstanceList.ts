import { SubstancesDetails, SubstancesResponse } from "@/types";

export const transformSubstanceData = (substances: SubstancesResponse): Array<SubstancesDetails> => {
  return substances.map((substance) => {
    console.log(substances, "subs");
    return {
      id: substance.id,
      category: substance.category,
      description: substance.description || "-",
      name: substance.name,
      structure: substance.structure || "",
      isExpired: substance.is_expired,
      quantityLeft: `${substance.locations[0].quantity_left} ${substance.locations[0].unit}`,
      storageLocation: `${substance.locations[0].room}/${substance.locations[0].location}`,
    };
  });
};
