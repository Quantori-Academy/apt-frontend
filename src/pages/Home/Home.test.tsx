import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Home from "./Home";

test("Home page", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", { name: "Home Page" })
  ).toBeInTheDocument();
});
