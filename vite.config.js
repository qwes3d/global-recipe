import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".", // Project root = global-recipe/

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Allows "@/..." imports
    },
  },

  build: {
    outDir: "dist", // Outputs to global-recipe/dist
    emptyOutDir: true, // Clears dist/ before build
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        favorites: resolve(__dirname, "src/pages/favorite.html"),
        funzone: resolve(__dirname, "src/pages/index.html"),
        flag: resolve(__dirname, "src/pages/flag.html"),
        timetravel: resolve(__dirname, "src/pages/timetravel.html"),
        geography: resolve(__dirname, "src/pages/geography.html"),
      },
    },
  },
});
