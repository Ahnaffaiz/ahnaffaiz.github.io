import { defineConfig } from "vite";

// GitHub Pages serves this repo from main /docs, so the build lands there
// and is committed. Actions cannot build for us while the account is
// billing-locked; see scripts/deploy-pages.sh.
export default defineConfig({
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
