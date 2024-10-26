import { SubstancesResponse } from "../src/types";

export const substancesObj: SubstancesResponse = [
  {
    id: "8",
    name: "Ethanol",
    description: "Common alcohol for lab use",
    structure: "C2H5OH",
    category: "Reagent",
    is_expired: true,
    locations: [
      {
        room: "Room 102",
        location: "Cabinet C3",
        quantity_left: 5,
        unit: "1 kg",
      },
    ],
  },
  {
    id: "7",
    name: "Water",
    description: "Laboratory grade distilled water",
    structure: "H2O",
    category: "Sample",
    is_expired: false,
    locations: [
      {
        room: "Room 101",
        location: "Shelf B2",
        quantity_left: 10,
        unit: "500 ml",
      },
    ],
  },
];
