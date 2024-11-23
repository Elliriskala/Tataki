import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  base: "./",
  root: "./HTML", // Set the root to your HTML directory
  envDir: "./",
  publicDir: "./public",
  build: {
    outDir: "../dist", // Output the built files outside the HTML folder
    rollupOptions: {
        external: [],
      input: {
        main: path.resolve(__dirname, "HTML/index.html"), 
        about: path.resolve(__dirname, "HTML/about.html"),
        admin: path.resolve(__dirname, "HTML/admin.html"),
        contact: path.resolve(__dirname, "HTML/contact.html"),
        menu: path.resolve(__dirname, "HTML/menu.html"),
        order_management: path.resolve(__dirname, "HTML/order_management.html"),
        order: path.resolve(__dirname, "HTML/order.html"),
        review: path.resolve(__dirname, "HTML/review.html"),
        reservation: path.resolve(__dirname, "HTML/reservation.html"),
        user: path.resolve(__dirname, "HTML/user.html")
      },
    },
  },
  plugins: [
    nodePolyfills(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      workbox: {
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
        "review.css"
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
