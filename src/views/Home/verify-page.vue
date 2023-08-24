<template>
  <div :style="{ backgroundColor: '#eff2f5', padding: '10px' }">
    <VerifyInput v-model="value" @onComplete="onComplete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VerifyInput } from '@/components/VerifyInput'

const value = ref()

function onComplete(val: string) {
  console.log('>>> onComplete 输入完毕', val)
}
</script>
