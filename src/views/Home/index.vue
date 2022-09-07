<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  // defineProps<{ waited: boolean }>()
  
  const router = useRouter()

  onMounted(() => {
    console.log(useRoute());
  });

  function toTest() {
    router.push('/test')
  }
</script>

<template>
  <div>
    <h1>Home page</h1>
    <button @click="toTest">去测试页面</button>
    <!-- <p v-if="waited != null">I waited for {{ waited }}</p> -->
  </div>
</template>