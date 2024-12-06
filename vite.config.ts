/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import {nodePolyfills} from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths(), nodePolyfills()],

  server: {
    port: 3000,
  },

  test: {
    globals: true,
    passWithNoTests: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      all: false,
      enabled: true,
    },
  },
  build: {
    commonjsOptions: {transformMixedEsModules: true}
  }
});
