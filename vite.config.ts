import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/scss/mixins.scss'; @import './src/scss/variables.scss';`
      }
    }
  }
})
