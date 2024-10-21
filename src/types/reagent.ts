export type FrontEndReagent = {
  substanceId: number;
  name: string;
  description: string;
  structure: string;
  category: string;
  totalQuantityLeft: number;
  unit: string;
  pricePerUnit: string;
  locationId: number;
  catalogID: number;
  producer: string;
  CASNumber: string;
  catalogLink: string;
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
