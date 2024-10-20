export type FrontEndReagent = {
  substanceId: number;
  name: string;
  category: string;
  CASNumber: string;
  producer: string;
  locationId: number;
  unit: string;
  pricePerUnit: string;
  totalQuantityLeft: number;
  catalogID: number;
  catalogLink: string;
  description: string;
  structure: string;
};

export type BackEndReagent = Omit<
  FrontEndReagent,
  "substanceId" | "CASNumber" | "catalogID" | "catalogLink" | "totalQuantityLeft" | "pricePerUnit" | "locationId"
> & {
  substance_id: number;
  cas_number: string;
  catalog_id: number;
  catalog_link: string;
  total_quantity_left: number;
  price_per_unit: string;
  location_id: number;
};
