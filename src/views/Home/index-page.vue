<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ShadowButton from '@/components/ShadowButton.vue'
// defineProps<{ waited: boolean }>()

const router = useRouter()

onMounted(() => {
  console.log(useRoute())
})

function toTest() {
  router.push('/test')
}

function toVerifyPage() {
  router.push('/verify-page')
}

async function getData() {
  try {
    const response = await fetch('/api/auth/users/33?token=123', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'hello' })
    })
    console.log('>>> response.json()', response)
    const data = await response.json()
    console.log('>>> res data', data)
  } catch (error) {
    console.log('>>> error', error)
  }
}
</script>

<template>
  <div>
    <h1>Home page</h1>
    <div class="btn-wrap">
      <ShadowButton @click="toTest">Get a Demo</ShadowButton>
      <br />
      <ShadowButton @click="getData">获取mock数据</ShadowButton>
      <br />
      <ShadowButton @click="toVerifyPage">跳转verify-page</ShadowButton>
    </div>

    <!-- <p v-if="waited != null">I waited for {{ waited }}</p> -->
  </div>
</template>

<style scoped lang="less">
.btn-wrap {
  margin: 20px auto;
  max-width: 150px;
}
</style>
