import { StorageTotalQuantity, StorageTotalResponse } from "@/types";

export const transformStorageTotalResponse = (response: StorageTotalResponse): Array<StorageTotalQuantity> => {
  return response.map((item) => ({
    id: item.substance_id,
    name: item.name,
    category: item.category,
    totalQuantityLeft: parseFloat(item.total_quantity_left),
    unit: item.unit,
  }));
};
