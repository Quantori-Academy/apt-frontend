import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

import "@/i18n.ts";

afterEach(() => {
  cleanup();
});
