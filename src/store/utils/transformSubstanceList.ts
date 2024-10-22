import { SubstancesCategory, SubstancesDetails } from "@/types";

type LocationResponse = {
  room: string;
  location: string;
  quantity_left: number;
  unit: string;
};

export type SubstanceItemResponse = {
  id: string;
  name: string;
  description: string;
  structure: string;
  is_expired: boolean;
  locations: Array<LocationResponse>;
};

export type SubstancesResponse = {
  substances: {
    reagents: Array<SubstanceItemResponse>;
    samples: Array<SubstanceItemResponse>;
  };
};

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
  console.log("transform:");
  const reagents = transformSubstanceData(substances.substances.reagents, "Reagent");
  const samples = transformSubstanceData(substances.substances.samples, "Sample");

  return [...reagents, ...samples];
};
