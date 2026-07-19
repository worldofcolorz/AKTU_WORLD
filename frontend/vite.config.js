import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // Local dev only: forwards /api/* to the local Flask server so relative
    // fetches work without CORS. In production (and if VITE_API_URL is set
    // locally), lib/api.js talks to the backend's absolute URL directly
    // instead - this proxy has no effect there.
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist'
  }
})


