<script setup lang="ts" generic="T extends Item">
export interface Item {
  name: string
}

withDefaults(defineProps<{ list: T[] }>(), {
  list() {
    // 函数返回，避免对象引用被修改
    return []
  }
})

defineSlots<{
  default(props: { index: number; row: T }): any
}>()
</script>

<template>
  <ul>
    <li v-for="(item, i) in list" :key="item.name">
      <slot :index="i" :row="item" v-if="$slots.default"></slot>
      <template v-else>{{ i + 1 }} {{ item.name }}</template>
    </li>
  </ul>
</template>
