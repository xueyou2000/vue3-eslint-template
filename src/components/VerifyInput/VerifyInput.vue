<template>
  <div class="verify-input">
    <ul class="verify-input-list">
      <template v-for="n in length" :key="n">
        <VerifyInputItem
          :modelValue="charList[n - 1]"
          :type="type"
          :focused="focusedIndex === n - 1"
          @update:modelValue="onItemValueChange($event, n - 1)"
          @clear="onItemValueClear(n - 1)"
          @focus="focusedIndex = n - 1"
        />
      </template>
    </ul>
    <button @click="focusedIndex = 1">test</button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import VerifyInputItem from './VerifyInputItem.vue'
import { ValueWitchEmpty, VerifyInputEvents, VerifyInputProps } from './types'
import {
  charListToString,
  createCharList,
  getNextIndex,
  findEmptyChatIndex,
  paddingCharList
} from './utils'

const emits = defineEmits<VerifyInputEvents>()
const props = withDefaults(defineProps<VerifyInputProps>(), {
  type: 'text',
  length: 6
})

const charList = ref(createCharList(props.length, props.modelValue))
const focusedIndex = ref(getNextIndex(props.modelValue))

function onItemValueChange(value: ValueWitchEmpty, index: number) {
  charList.value[findEmptyChatIndex(charList.value)] = value
  const str = charListToString(charList.value)
  focusedIndex.value = getNextIndex(str)
  if (focusedIndex.value === props.length && str.length === props.length) {
    emits('onComplete', str)
  }
}

function onItemValueClear(index: number) {
  // 当前index后的内容都往前移
  charList.value = paddingCharList(charList.value, index)
  // todo: 在下一次渲染后， selecttion 光标位置放在末尾
  nextTick(() => {
    setTimeout(() => {
      const selection = window.getSelection()
      if (selection) {
        selection.deleteFromDocument()
        console.log(selection)
        if (selection.focusNode) {
          selection.selectAllChildren(selection.focusNode)
        }
        selection.collapseToEnd()
      }
    }, 2000)
  })

  //焦点重建
  const i = getNextIndex(charListToString(charList.value))
  focusedIndex.value = i > 0 ? i - 1 : i
}
</script>

<style lang="less">
.verify-input {
  position: relative;
  -webkit-user-select: none;
  user-select: none;

  & > .verify-input-list {
    display: flex;
    width: 100%;
    height: 50px;
    cursor: pointer;
  }
}
</style>
