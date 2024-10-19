export type StorageLocation = {
  roomId: string;
  roomName: string;
  locationId: string;
  locationName: string;
};

export type Reagent = {
  reagentID: string;
  name: string;
  category: string;
  description: string;
  structure: string;
  CASNumber: string;
  producer: string;
  catalogID: string;
  catalogLink: string;
  storageLocation: StorageLocation;
  units: string;
  pricePerUnit: number;
  quantity: number;
};
