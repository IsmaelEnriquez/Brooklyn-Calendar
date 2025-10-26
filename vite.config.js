// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), react()],
  base: mode === "production" ? "/Brooklyn-Calendar/" : "/", // 👈 dev stays at '/'
}));
