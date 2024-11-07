import { expect, test } from "vitest";

import { SubstancesDetails } from "@/types";
import { getListData } from "@/utils/getReagentsListData.ts";

const mockData: Array<SubstancesDetails> = [
  {
    id: "1",
    name: "Substance A",
    category: "Sample",
    structure: "C6H12O6",
    description: "Simple sugar compound.",
    quantityLeft: "150g",
    storageLocation: "Fridge A1",
    isExpired: false,
  },
  {
    id: "2",
    name: "Substance B",
    category: "Reagent",
    structure: "H2O",
    description: "Common solvent.",
    quantityLeft: "500ml",
    storageLocation: "Shelf B2",
    isExpired: false,
  },
  {
    id: "3",
    name: "Substance C",
    category: "Sample",
    structure: "NaCl",
    description: "Table salt.",
    quantityLeft: "250g",
    storageLocation: "Shelf C3",
    isExpired: true,
  },
  {
    id: "4",
    name: "Substance D",
    category: "Reagent",
    structure: "CH4",
    description: "Methane gas.",
    quantityLeft: "20L",
    storageLocation: "Gas Cylinder D4",
    isExpired: false,
  },
  {
    id: "5",
    name: "Substance E",
    category: "Sample",
    structure: "C2H5OH",
    description: "Ethanol solution.",
    quantityLeft: "200ml",
    storageLocation: "Cabinet E5",
    isExpired: false,
  },
  {
    id: "6",
    name: "Substance F",
    category: "Reagent",
    structure: "C12H22O11",
    description: "Sucrose compound.",
    quantityLeft: "300g",
    storageLocation: "Shelf F6",
    isExpired: true,
  },
  {
    id: "7",
    name: "Substance G",
    category: "Sample",
    structure: "C4H10",
    description: "Butane gas.",
    quantityLeft: "15L",
    storageLocation: "Storage G7",
    isExpired: false,
  },
  {
    id: "8",
    name: "Substance H",
    category: "Reagent",
    structure: "C3H8O",
    description: "Isopropanol solution.",
    quantityLeft: "250ml",
    storageLocation: "Cabinet H8",
    isExpired: false,
  },
  {
    id: "9",
    name: "Substance I",
    category: "Sample",
    structure: "Fe2O3",
    description: "Iron oxide powder.",
    quantityLeft: "100g",
    storageLocation: "Drawer I9",
    isExpired: true,
  },
  {
    id: "10",
    name: "Substance J",
    category: "Reagent",
    structure: "NH3",
    description: "Ammonia gas.",
    quantityLeft: "10L",
    storageLocation: "Cylinder J10",
    isExpired: false,
  },
];

test("should return reagents list", () => {
  const { visibleItems, totalPages } = getListData({
    items: mockData,
    expiredFilter: "Expired",
    categoryFilter: "Sample",
    sortColumn: "name",
    sortDirection: "desc",
    page: 0,
    pageSize: 3,
    searchQuery: "",
  });

  expect(visibleItems).toHaveLength(2);
  expect(totalPages).toBe(2);
  expect(visibleItems[0].name).toBe("Substance I");
  expect(visibleItems[1].name).toBe("Substance C");
});

test("should search reagents list", () => {
  const { visibleItems } = getListData({
    items: mockData,
    expiredFilter: "All",
    categoryFilter: "Reagent",
    sortColumn: "name",
    sortDirection: "asc",
    page: 0,
    pageSize: 10,
    searchQuery: "shelf",
  });

  expect(visibleItems).toHaveLength(2);
  expect(visibleItems[0].name).toBe("Substance B");
  expect(visibleItems[1].name).toBe("Substance F");
});
