import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  // tsconfig laisse le JSX à Next (`jsx: "preserve"`). Vitest 4 passe par oxc :
  // sans cette option, importer un composant .tsx dans un test échoue.
  oxc: {
    jsx: {
      runtime: "automatic",
      importSource: "react",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
