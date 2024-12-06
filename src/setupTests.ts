import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

import "@/i18n.ts";

vi.mock("ketcher-core", () => ({
  Ketcher: vi.fn(),
}));

vi.mock("ketcher-react", () => ({
  Editor: vi.fn(),
}));

vi.mock("ketcher-standalone", () => ({
  StandaloneStructServiceProvider: vi.fn(),
}));

afterEach(() => {
  cleanup();
});
