import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import bundleAnalyzer from 'rollup-plugin-bundle-analyzer'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
// @ts-ignore
import legacy from '@vitejs/plugin-legacy'

function getProductionPlugins() {
  return [
    // polyfill
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    bundleAnalyzer({})
  ]
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isPro = mode === 'production'

  return {
    server: {
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    base: '/',
    build: {
      // modules 等价 ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
      target: isPro ? 'es2015' : 'modules'
    },
    plugins: [
      vue(),
      // 添加下面这块
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue']
      }),
      ...(isPro ? getProductionPlugins() : [])
    ]
  }
})
