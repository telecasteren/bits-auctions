import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [tailwindcss()],
  root: ".",
  base: "/bits-auctions/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/bits-auctions\/.*$/, to: "/bits-auctions/index.html" },
      ],
    },
  },
  preview: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/bits-auctions\/.*$/, to: "/bits-auctions/index.html" },
      ],
    },
  },
});
