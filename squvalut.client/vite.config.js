// vite.config.js
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const target = 'https://localhost:44326'; // Updated to match your ASP.NET Core server's port

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 5202, // Vite client port, can remain the same
        https: false,
        proxy: {
            '/api': {
                target: target,
                changeOrigin: true,
                secure: false
            }
        }
    }
});
