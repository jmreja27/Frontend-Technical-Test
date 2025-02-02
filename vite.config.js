import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'images',
    rollupOptions: {
      output: {
        assetFileNames: 'images/[name]-[hash][extname]',
      },
    },
  }
})
