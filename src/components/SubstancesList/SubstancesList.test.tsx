import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import SubstancesList from "@/components/SubstancesList/SubstancesList.tsx";
import { userRoles } from "@/constants";
import { selectUserRole } from "@/store";
import { Wrapper } from "@/test-utils";

vi.mock("@/store", async () => ({
  ...(await vi.importActual("@/store")),
  selectUserRole: vi.fn(),
  useGetStorageRoomsQuery: vi.fn(() => ({ data: [], isLoading: false })),
}));

test("renders substances list for Researcher", () => {
  vi.mocked(selectUserRole).mockReturnValue(userRoles.Researcher);
  render(<SubstancesList substances={[]} isInLocation={false} />, {
    wrapper: Wrapper,
  });
  expect(screen.getByRole("button", { name: "Add reagent" }));
  expect(screen.getByRole("button", { name: "Add sample" }));
});

test("renders substances list for Administrator", () => {
  vi.mocked(selectUserRole).mockReturnValue(userRoles.Administrator);
  render(<SubstancesList substances={[]} isInLocation={false} />, {
    wrapper: Wrapper,
  });
  expect(
    screen.queryByRole("button", { name: "Add reagent" })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Add sample" })
  ).not.toBeInTheDocument();
});

test("renders substances list for Officer", () => {
  vi.mocked(selectUserRole).mockReturnValue(userRoles.ProcurementOfficer);
  render(<SubstancesList substances={[]} isInLocation={false} />, {
    wrapper: Wrapper,
  });
  expect(screen.getByRole("button", { name: "Add reagent" }));
  expect(
    screen.queryByRole("button", { name: "Add sample" })
  ).not.toBeInTheDocument();
});

test("renders substances list in locations", () => {
  vi.mocked(selectUserRole).mockReturnValue(userRoles.Researcher);
  render(<SubstancesList substances={[]} isInLocation={true} />, {
    wrapper: Wrapper,
  });
  expect(
    screen.queryByRole("button", { name: "Add reagent" })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Add sample" })
  ).not.toBeInTheDocument();
});

test("renders substances list with dispose substances button", () => {
  vi.mocked(selectUserRole).mockReturnValue(userRoles.Researcher);
  render(
    <SubstancesList
      substances={[
        {
          id: "S001",
          name: "Substance 1",
          category: "Reagent",
          structure: "C10H20O5",
          description: "A potent chemical for lab experiments.",
          quantityLeft: "200g",
          storageLocation: "Shelf A3",
          isExpired: false,
          expirationDate: "2025-05-10",
          unit: "g",
        },
        {
          id: "S002",
          name: "Substance 2",
          category: "Sample",
          structure: "C15H22O4",
          description: "Biological substance used in research.",
          quantityLeft: "50mL",
          storageLocation: "Refrigerator B2",
          isExpired: true,
          expirationDate: "2023-12-01",
          unit: "mL",
        },
        {
          id: "S003",
          name: "Substance 3",
          category: "Reagent",
          structure: "C12H16O7",
          description: "Chemical compound for reactions.",
          quantityLeft: "100g",
          storageLocation: "Shelf C5",
          isExpired: true,
          expirationDate: "2023-09-15",
          unit: "g",
        },
      ]}
      isInLocation={false}
    />,
    {
      wrapper: Wrapper,
    }
  );
  fireEvent.click(screen.getByRole("button", { name: "Expired" }));

  expect(screen.getByRole("button", { name: "Dispose Expired Substances" }));
  expect(screen.getByText("Substance 2")).toBeInTheDocument();
  expect(screen.queryByText("Substance 1")).not.toBeInTheDocument();
});
