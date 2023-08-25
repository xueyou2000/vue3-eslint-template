<template>
  <div :style="{ backgroundColor: '#eff2f5', padding: '10px' }">
    <VerifyInput ref="verifyInputRef" v-model="value" @onComplete="onComplete" type="text" />
    <ShadowButton @click="test">焦点</ShadowButton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VerifyInput } from '@/components/VerifyInput'
import ShadowButton from '@/components/ShadowButton.vue'

const value = ref()
const verifyInputRef = ref<InstanceType<typeof VerifyInput>>()

function onComplete(val?: string | null) {
  console.log('>>> onComplete 输入完毕', val)
}

function test() {
  verifyInputRef.value?.focusIndex(0)
}
</script>
