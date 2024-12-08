import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
// import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  envDir: "./",
  publicDir: "./public",
  build: {
    outDir: "./dist", // Output the built files outside the HTML folder
    rollupOptions: {
        external: [],
      input: {
        admin: path.resolve(__dirname, "admin.html"),
        contact: path.resolve(__dirname, "contact.html"),
        menu: path.resolve(__dirname, "menu.html"),
        order: path.resolve(__dirname, "order.html"),
        review: path.resolve(__dirname, "review.html"),
        reservation: path.resolve(__dirname, "reservation.html"),
        user: path.resolve(__dirname, "user.html"),
        not_found: path.resolve(__dirname, "404.html"),
      },
    },
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      workbox: {
        navigateFallback: "/404.html",
        maximumFileSizeToCacheInBytes: 5000000, // 5MB
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,ttf,json}"], // Match all assets
      },
      includeAssets: [
        "about.css",
        "admin.css",
        "contact.css",
        "homepage.css",
        "login.css",
        "menu.css",
        "nav.css",
        "order_management.css",
        "order.css",
        "reservation.css",
        "review.css",
        "404.css"
      ],
      manifest: {
        name: "Tataki Sushi",
        short_name: "Tataki Sushi",
        theme_color: "#ffffff",
        description:
          "Tataki Sushi web application built with TypeScript, Node.js, Express.js, and MySQL.",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Make 'src' an alias for easier imports
    },
  },
});
