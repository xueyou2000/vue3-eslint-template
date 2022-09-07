<script setup lang="ts">
import { useRouter } from 'vue-router'
await sleep()
function sleep() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
}
const router = useRouter()
function toHome() {
  router.push('/home')
}
</script>

<template>
  <div>
    <p>测试页面</p>
    <button @click="toHome">回首页</button>
  </div>
</template>
