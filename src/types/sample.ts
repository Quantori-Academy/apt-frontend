import { BackendReagent, Reagent } from "./reagent";

export type Sample = Omit<Reagent, "CASNumber" | "producer" | "catalogID" | "catalogLink"> & {
  addedSubstances: AddedSubstance[];
};

export type BackendSample = Omit<BackendReagent, "cas_number" | "catalog_id" | "catalog_link" | "producer"> & {
  added_substances: AddedSubstance[];
};

export type AddedSubstance = {
  id: number;
  name: string;
  description: string;
  structure: string;
  category: string;
};
