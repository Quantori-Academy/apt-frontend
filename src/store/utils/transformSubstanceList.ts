import { SubstanceItemResponse, SubstancesCategory, SubstancesDetails, SubstancesResponse } from "@/types";

const transformSubstanceData = (substances: Array<SubstanceItemResponse>, category: SubstancesCategory) => {
  return substances.map((substance) => {
    return {
      id: substance.id,
      category: category,
      description: substance.description,
      name: substance.name,
      structure: substance.structure,
      isExpired: substance.is_expired,
      quantityLeft: `${substance.locations[0].quantity_left} ${substance.locations[0].unit}`,
      storageLocation: `${substance.locations[0].room}/${substance.locations[0].location}`,
    } as SubstancesDetails;
  });
};

export const transformSubstanceList = (substances: SubstancesResponse): Array<SubstancesDetails> => {
  const reagents = transformSubstanceData(substances.substances.reagents, "Reagent");
  const samples = transformSubstanceData(substances.substances.samples, "Sample");

  return [...reagents, ...samples];
};
