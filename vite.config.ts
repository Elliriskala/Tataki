import {loadEnv, defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
// import { nodePolyfills } from "vite-plugin-node-polyfills";
import dotenv from "dotenv";


dotenv.config();

export default defineConfig({
  base: "./", // Set the root to your HTML directory
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        about: path.resolve(__dirname, "about.html"),
        admin: path.resolve(__dirname, "admin.html"),
        contact: path.resolve(__dirname, "contact.html"),
        login: path.resolve(__dirname, "user.html"),
        menu: path.resolve(__dirname, "menu.html"),
        order: path.resolve(__dirname, "order.html"),
        order_management: path.resolve(__dirname, "order_management.html"),
        reservation: path.resolve(__dirname, "reservation.html"),
        review: path.resolve(__dirname, "review.html"),
      },
    },
  },
  plugins: [
    // nodePolyfills(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,ttf,json}"], // Match all assets
        maximumFileSizeToCacheInBytes: 5000000, // 5MB
      },
      includeAssets: [
        "robots.txt",
        "fonts/*",
        "img/*",
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
});
