import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite設定：ReactおよびTailwind CSS v4プラグインを有効化
export default defineConfig({
  base: '/Project-practicum2026/',
  plugins: [react(), tailwindcss()],
})

