import { MutationPatchSubstance } from "../substancesApi";

type SubstancePatchRequest = {
  old_location_id: number;
  new_quantity: string;
  new_location_id?: number;
};

export const transformSubstancePatchRequest = (data: MutationPatchSubstance): SubstancePatchRequest => {
  return {
    old_location_id: data.oldLocationId,
    new_quantity: data.quantity,
    new_location_id: data.newLocationId,
  };
};
