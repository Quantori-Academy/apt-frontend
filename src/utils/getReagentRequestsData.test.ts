import { expect, test } from "vitest";

import { ReagentRequests } from "@/types";
import { getRequestsListData } from "@/utils/getReagentRequestsData.ts";

const mockData: ReagentRequests = [
  {
    id: "2061",
    name: "Reagent 1",
    structure: "C10H20O5",
    CAS: "735467",
    amount: 500,
    quantity: "g",
    status: "Pending",
    userComment: "Stock running low",
    procurementComment: "",
    dateCreated: "2024-10-05 14:45:10",
    dateModified: "2024-10-06 14:45:10",
  },
  {
    id: "9385",
    name: "Reagent 2",
    structure: "C15H22O4",
    CAS: "358744",
    amount: 700,
    quantity: "mL",
    status: "Ordered",
    userComment: "Need urgent",
    procurementComment: "",
    dateCreated: "2024-10-06 14:45:10",
    dateModified: null,
  },
  {
    id: "4657",
    name: "Reagent 3",
    structure: "C12H16O7",
    CAS: "836104",
    amount: 300,
    quantity: "g",
    status: "Completed",
    userComment: null,
    procurementComment: "",
    dateCreated: "2024-10-10 14:45:10",
    dateModified: "2024-10-11 14:45:10",
  },
  {
    id: "9048",
    name: "Reagent 4",
    structure: "C9H12O6",
    CAS: "521238",
    amount: 450,
    quantity: "L",
    status: "Declined",
    userComment: "Urgent for the experiment",
    procurementComment: "Procurement in progress",
    dateCreated: "2024-10-12 14:45:10",
    dateModified: "2024-10-15 14:45:10",
  },
  {
    id: "2187",
    name: "Reagent 5",
    structure: "C14H20O9",
    CAS: "132344",
    amount: 550,
    quantity: "mg",
    status: "Ordered",
    userComment: null,
    procurementComment: "",
    dateCreated: "2024-10-13 14:45:10",
    dateModified: null,
  },
  {
    id: "3346",
    name: "Reagent 6",
    structure: "C13H18O9",
    CAS: "589103",
    amount: 700,
    quantity: "L",
    status: "Pending",
    userComment: "Stock running low",
    procurementComment: "",
    dateCreated: "2024-10-14 14:45:10",
    dateModified: "2024-10-16 14:45:10",
  },
  {
    id: "1218",
    name: "Reagent 7",
    structure: "C8H11O5",
    CAS: "989317",
    amount: 350,
    quantity: "g",
    status: "Completed",
    userComment: null,
    procurementComment: "",
    dateCreated: "2024-10-15 14:45:10",
    dateModified: null,
  },
  {
    id: "7392",
    name: "Reagent 8",
    structure: "C10H19O4",
    CAS: "552672",
    amount: 900,
    quantity: "mL",
    status: "Taken",
    userComment: "Urgent",
    procurementComment: "",
    dateCreated: "2024-10-17 14:45:10",
    dateModified: null,
  },
  {
    id: "5482",
    name: "Reagent 9",
    structure: "C7H8O3",
    CAS: "762801",
    amount: 250,
    quantity: "mL",
    status: "Declined",
    userComment: "Need urgent",
    procurementComment: "Order delayed",
    dateCreated: "2024-10-19 14:45:10",
    dateModified: null,
  },
  {
    id: "6019",
    name: "Reagent 10",
    structure: "C18H30O4",
    CAS: "892438",
    amount: 120,
    quantity: "g",
    status: "Pending",
    userComment: "Stock running low",
    procurementComment: "",
    dateCreated: "2024-10-20 14:45:10",
    dateModified: "2024-10-22 14:45:10",
  },
  {
    id: "4567",
    name: "Reagent 11",
    structure: "C10H18O8",
    CAS: "546344",
    amount: 800,
    quantity: "g",
    status: "Ordered",
    userComment: null,
    procurementComment: "",
    dateCreated: "2024-10-21 14:45:10",
    dateModified: null,
  },
  {
    id: "7265",
    name: "Reagent 12",
    structure: "C14H20O10",
    CAS: "392831",
    amount: 600,
    quantity: "mL",
    status: "Declined",
    userComment: "Need urgent",
    procurementComment: "Procurement in progress",
    dateCreated: "2024-10-23 14:45:10",
    dateModified: null,
  },
  {
    id: "5439",
    name: "Reagent 13",
    structure: "C16H24O5",
    CAS: "694849",
    amount: 350,
    quantity: "L",
    status: "Completed",
    userComment: null,
    procurementComment: "",
    dateCreated: "2024-10-24 14:45:10",
    dateModified: null,
  },
  {
    id: "9347",
    name: "Reagent 14",
    structure: "C12H18O7",
    CAS: "384950",
    amount: 450,
    quantity: "g",
    status: "Taken",
    userComment: null,
    procurementComment: "",
    dateCreated: "2024-10-25 14:45:10",
    dateModified: null,
  },
  {
    id: "7489",
    name: "Reagent 15",
    structure: "C5H8O6",
    CAS: "823958",
    amount: 600,
    quantity: "mL",
    status: "Ordered",
    userComment: "Urgent for the experiment",
    procurementComment: "",
    dateCreated: "2024-10-26 14:45:10",
    dateModified: null,
  },
];

test("should return reagent requests list", () => {
  const { visibleItems, totalPages } = getRequestsListData({
    items: mockData,
    pageSize: 5,
    page: 0,
    sortDirection: "none",
    sortColumn: "name",
    statusFilter: "Declined",
    searchQuery: "",
  });

  expect(visibleItems).toHaveLength(3);
  expect(totalPages).toBe(3);
  expect(visibleItems[0].name).toBe("Reagent 4");
  expect(visibleItems[1].name).toBe("Reagent 9");
  expect(visibleItems[2].name).toBe("Reagent 12");
});

test("should search reagent request list", () => {
  const { visibleItems } = getRequestsListData({
    items: mockData,
    pageSize: 5,
    page: 0,
    sortDirection: "none",
    sortColumn: "name",
    statusFilter: "Pending",
    searchQuery: "1",
  });

  expect(visibleItems).toHaveLength(2);
  expect(visibleItems[0].name).toBe("Reagent 1");
  expect(visibleItems[1].name).toBe("Reagent 10");
});

test("should search reagent request list and sort by name", () => {
  const { visibleItems } = getRequestsListData({
    items: mockData,
    pageSize: 5,
    page: 0,
    sortDirection: "asc",
    sortColumn: "name",
    statusFilter: "Taken",
    searchQuery: "re",
  });

  expect(visibleItems).toHaveLength(2);
  expect(visibleItems[0].name).toBe("Reagent 14");
  expect(visibleItems[1].name).toBe("Reagent 8");
});
