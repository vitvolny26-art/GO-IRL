import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/go-irl-v0-[hash].js",
        chunkFileNames: "assets/go-irl-v0-[hash].js",
        assetFileNames: "assets/go-irl-v0-[hash][extname]",
      },
    },
  },
});
