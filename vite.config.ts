import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// BASE_PATH permite desplegar en https://tu-usuario.github.io/nombre-repo/
// Ejemplo:  set BASE_PATH=/linkhub/ && npm run build   (Windows PowerShell: $env:BASE_PATH="/linkhub/")
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
})
