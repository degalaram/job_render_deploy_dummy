import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname equivalent for ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname), // frontend root folder
  build: {
    outDir: path.resolve(__dirname, "dist"), // final build will go into /dist
    emptyOutDir: true,
  },
  base: "./", // important for correct asset paths in production
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});