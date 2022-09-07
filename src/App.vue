<script setup lang="ts">
import PageLoading from '@/components/loading/PageLoading.vue'
</script>

<template>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" @update-case="handle" ref="tt">
    <template #hd>header666</template>
  </HelloWorld> -->

  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition name="fade" mode="out-in">
        <KeepAlive>
          <Suspense :timeout="400">
            <!-- 主要内容 -->
            <component :is="Component"></component>

            <!-- 加载中状态 -->
            <template #fallback>
              <PageLoading />
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
