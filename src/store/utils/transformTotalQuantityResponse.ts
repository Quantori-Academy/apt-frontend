import { SubstancesTotalQuantity, SubstancesTotalQuantityResponse } from "@/types";

export const transformTotalQuantityResponse = (
  substances: Array<SubstancesTotalQuantityResponse>
): Array<SubstancesTotalQuantity> => {
  return substances.map((substance) => {
    return {
      id: substance.substance_id,
      name: substance.name,
      category: substance.category,
      locations: substance.locations.map((location) => {
        return {
          locationId: location.location_id,
          room: location.room,
          location: location.location,
          totalQuantityLeft: location.total_quantity_left,
          unit: location.unit,
        };
      }),
    };
  });
};
