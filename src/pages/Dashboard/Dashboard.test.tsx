import { render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import { userRoles } from "@/constants";
import { Dashboard } from "@/pages";
import { selectUserRole } from "@/store";
import { Wrapper } from "@/test-utils";

vi.mock("@/store", async () => ({
  ...(await vi.importActual("@/store")),
  selectUserRole: vi.fn(),
}));

afterEach(() => {
  vi.resetAllMocks();
});

test("renders dashboard cards for Administrator", () => {
  vi.mocked(selectUserRole).mockReturnValue(userRoles.Administrator);
  render(<Dashboard />, { wrapper: Wrapper });
  expect(screen.getByRole("heading", { name: "Substances" }));
  expect(screen.getByRole("heading", { name: "Users" }));
  expect(screen.getByRole("heading", { name: "Storage" }));
});

test("renders dashboard cards for Researcher", () => {
  vi.mocked(selectUserRole).mockReturnValue(userRoles.Researcher);
  render(<Dashboard />, { wrapper: Wrapper });
  expect(screen.getByRole("heading", { name: "Substances" }));
  expect(screen.getByRole("heading", { name: "Storage" }));
  expect(screen.getByRole("heading", { name: "Reagent Requests" }));
});

test("renders dashboard cards for Procurement Officer", () => {
  vi.mocked(selectUserRole).mockReturnValue(userRoles.ProcurementOfficer);
  render(<Dashboard />, { wrapper: Wrapper });
  expect(screen.getByRole("heading", { name: "Orders" }));
  expect(screen.getByRole("heading", { name: "Reagent Requests" }));
});
