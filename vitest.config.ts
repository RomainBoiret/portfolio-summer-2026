import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/lib/**/*.ts", "src/i18n/**/*.ts"],
      exclude: [
        "src/**/*.test.ts",
        "src/lib/console-egg-script.ts",
        "src/lib/theme-script.ts",
        "src/lib/blog.ts",
        "src/lib/blog-types.ts",
        "src/lib/github-stats.ts",
      ],
    },
  },
});
