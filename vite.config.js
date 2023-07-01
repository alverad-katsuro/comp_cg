import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import paths from 'vite-tsconfig-paths'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), paths()],
  resolve: {
    mainFields: ["module"],
    alias: {
      src: path.resolve(__dirname, 'src/'),
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/')
    }
  },
  test: {
    deps: {
      inline: [
        "echarts"
      ]
    }
  }
})