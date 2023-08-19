import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import bundleAnalyzer from 'rollup-plugin-bundle-analyzer'
import { defineConfig, loadEnv } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import { Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import'
import legacy from '@vitejs/plugin-legacy'

function getProductionPlugins() {
  return [
    // polyfill
    legacy({
      targets: ['chrome 52', 'Android > 39', 'iOS >= 10.3', 'iOS >= 10.3'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // IE11需要此插件
    }),
    importToCDN({
      modules: [
        autoComplete('vue'),
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'https://unpkg.com/vue-router@4.2.4/dist/vue-router.global.prod.js'
        },
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: 'https://cdn.bootcdn.net/ajax/libs/vue-demi/0.14.5/index.iife.js'
        },
        {
          name: 'pinia',
          var: 'Pinia',
          path: 'https://cdn.bootcdn.net/ajax/libs/pinia/2.1.6/pinia.iife.prod.min.js'
        }
      ]
    }),
    ...(process.env.ANALYZER == '1' ? [bundleAnalyzer({})] : [])
  ]
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isPro = mode === 'production'
  console.log('>>> NODE_ENV', env.NODE_ENV)

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
    esbuild: {
      drop: isPro ? ['console', 'debugger'] : []
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
