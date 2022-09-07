<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  onMounted(() => {
    console.log(useRoute().params.patchMatch)
  });
</script>

<template>
  <div>
    <h1>404 Not found</h1>
  </div>
</template>