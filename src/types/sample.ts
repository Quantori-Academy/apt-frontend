import { BackEndReagent, FrontEndReagent } from "./reagent";

export type FrontEndSample = Omit<FrontEndReagent, "CASNumber" | "producer" | "catalogID" | "catalogLink"> & {
  addedSubstances: AddedSubstance[];
};

export type BackEndSample = Omit<BackEndReagent, "cas_number" | "catalog_id" | "catalog_link" | "producer"> & {
  added_substances: AddedSubstance[];
};

export type AddedSubstance = {
  id: number;
  name: string;
  description: string;
  structure: string;
  category: string;
};
