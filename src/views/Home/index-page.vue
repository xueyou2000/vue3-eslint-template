<script setup lang="ts">
import ShadowButton from '@/components/ShadowButton.vue'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ref } from 'vue'
defineProps<{ query: boolean }>()

const data = ref()
async function fetchData() {
  try {
    const response = await fetch('/api/auth/users/33?token=123', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'hello' })
    })
    data.value = await response.json()
    console.log('>>> res data', data.value)
  } catch (error) {
    console.log('>>> error', error)
  }
}
</script>

<template>
  <div class="home-page">
    <ThemeToggle />
    <nav class="nav">
      <ul>
        <li><a href="/test">异步加载页</a></li>
        <li><a href="/verify-page">验证码输入框组件</a></li>
      </ul>
    </nav>
    <div class="btn-wrap">
      <ShadowButton @click="fetchData">获取mock数据</ShadowButton>
    </div>
    <code :style="{ whiteSpace: 'pre' }">
      {{ JSON.stringify(data, null, 4) }}
    </code>

    <p v-if="query != null">propr for router {{ query }}</p>
  </div>
</template>

<style scoped lang="less">
.home-page {
  padding: 20px;
}
.nav {
  ul {
    list-style: circle inside;
  }
  li {
    padding: 5px 0;
    -webkit-tap-highlight-color: transparent;
  }
}
.btn-wrap {
  margin: 20px auto;
  max-width: 150px;
}
</style>
