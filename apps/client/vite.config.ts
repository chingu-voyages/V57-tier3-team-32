import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // this works the same way as
      // "@": path.resolve(__dirname, "./src"),
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
