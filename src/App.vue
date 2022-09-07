<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import FlipListDemo from './demos/transition/FlipListDemo.vue'

const tt = ref<{consoleCount: () => void;} | undefined>();

function handle(count: number) {
  console.log('count: ', count)
  tt.value?.consoleCount()
}



</script>

<template>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" @update-case="handle" ref="tt">
    <template #hd>header666</template>
  </HelloWorld> -->

  <RouterView v-slot="{ Component, route }">
    <template v-if="Component">
    <Transition name="fade" mode="out-in">
      <KeepAlive>
        <Suspense>
          <!-- 主要内容 -->
          <component :is="Component"></component>

          <!-- 加载中状态 -->
          <template #fallback>
            正在加载...
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </template>
  </RouterView>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
