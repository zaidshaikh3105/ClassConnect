import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: "terser",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "@reduxjs/toolkit",
            "react-redux",
          ],
          appwrite: ["appwrite"],
          editor: ["@tinymce/tinymce-react"],
        },
      },
    },
  },
});
