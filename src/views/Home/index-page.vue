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

function handleClick() {
  console.log('click')
}
</script>

<template>
  <div>
    <h1>Home page</h1>
    <button @click="toTest">去测试页面</button>
    <div class="btn-wrap">
      <ShadowButton @click="handleClick">Get a Demo</ShadowButton>
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
