import { MutationPatchSubstance } from "../substancesApi";

export const transformSubstancePatchRequest = (data: MutationPatchSubstance) => {
  return {
    old_location_id: data.oldLocationId,
    new_quantity: data.quantity,
    new_location_id: data.newLocationId,
  };
};
