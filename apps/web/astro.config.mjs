import node from "@astrojs/node";
import react from "@astrojs/react";
// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import { config as loadDotenv } from "dotenv";

// Astro/Vite exposes .env vars via import.meta.env, not process.env.
// Third-party packages using process.env (e.g. @portify/db) need this.
loadDotenv();

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [react()],
  env: {
    schema: {
      PUBLIC_SERVER_URL: envField.string({
        access: "public",
        context: "client",
        default: "http://localhost:3000",
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["react", "react-dom", "react-dom/client"],
    },
    resolve: {
      dedupe: ["react", "react-dom"],
    },
  },
});
