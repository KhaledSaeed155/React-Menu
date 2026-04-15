import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // This forces Vite to name the folder "build" instead of "dist"
  },
})
