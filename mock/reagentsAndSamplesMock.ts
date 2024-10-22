import { SubstancesResponse } from "../src/store/utils/transformSubstanceList";

export const substancesObj: SubstancesResponse = {
  substances: {
    reagents: [
      {
        id: 8,
        name: "Ethanol",
        description: "Common alcohol for lab use",
        structure: "C2H5OH",
        is_expired: true,
        locations: [
          {
            room: "Room 102",
            location: "Cabinet C3",
            quantity_left: 5,
            unit: "mL",
          },
        ],
      },
    ],
    samples: [
      {
        id: 7,
        name: "Water",
        description: "Laboratory grade distilled water",
        structure: "H2O",
        is_expired: false,
        locations: [
          {
            room: "Room 101",
            location: "Shelf B2",
            quantity_left: 10,
            unit: "mg",
          },
        ],
      },
    ],
  },
};
