import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const apiBase = process.env.VITE_API_BASE_URL
const apiOrigin = apiBase ? new URL(apiBase).origin : 'http://wordpress'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
    proxy: {
      '/wp-json': {
        target: apiOrigin,
        changeOrigin: true,
      },
    },
  },
})
