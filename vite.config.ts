import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    root: './HTML',
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {enabled: true},
            workbox: {
                globPatterns: ['**/*.{js, css, html, ico, png, jpg, jpeg, svg, ttf, json}']
            }
        })
    ]    
});