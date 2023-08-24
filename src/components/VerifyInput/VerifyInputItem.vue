<template>
  <li class="verify-input-item" :class="{ focused }">
    <div
      class="mock-input"
      contenteditable
      :type="type"
      ref="inputRef"
      v-text="modelValue"
      @input="onInput"
      @paste="onPaste"
      @focus="$emit('focus', $event)"
      @keydown="KeyboardEvent"
    ></div>
  </li>
</template>

<script setup lang="ts">
import { useFocus } from '@vueuse/core'
import { ref, watch } from 'vue'
import { VerifyInputItemEvents, VerifyInputItemProps } from './types'

const emits = defineEmits<VerifyInputItemEvents>()
const props = withDefaults(defineProps<VerifyInputItemProps>(), {
  type: 'text'
})

const inputRef = ref<HTMLInputElement>()
const { focused } = useFocus(inputRef)
// onKeyPressed(['Backspace'], () => {
//   console.log('>>> 按下退格键')
// })

function onInput(event: any) {
  const content = (event.target?.innerText || '').trim()
  if (content) {
    event.target.innerText = ''
    emits('update:modelValue', content)
  } else {
    emits('clear')
  }
}

function KeyboardEvent(event: KeyboardEvent) {
  if (event.key === 'Backspace') {
    emits('clear')
  }
}

function onPaste(event: ClipboardEvent) {
  event.preventDefault()

  const paste = event.clipboardData?.getData('text')
  const selection = window.getSelection()
  if (paste && selection) {
    selection.deleteFromDocument()
    selection.getRangeAt(0).insertNode(document.createTextNode(paste))
    selection.collapseToEnd()
  }
}

// watchEffect(() => {
//   if (props.focused) {
//     focused.value = props.focused
//   }
// })

watch(
  () => props.focused,
  (focus) => {
    focused.value = focus
  }
)
</script>

<style lang="less">
.verify-input-item {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #323232;
  font-size: 20px;
  line-height: 1.2;
  background-color: #fff;

  &.focused {
    border: 1px solid royalblue;
  }

  .mock-input {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    // height: 100%;
    outline: none;
    border: 0;
  }

  &::after {
    position: absolute;
    box-sizing: border-box;
    content: '';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 0 solid #ebedf0;
    transform: scale(0.5);
  }
  &:not(:first-child) {
    &::after {
      border-left-width: 1px;
    }
  }
}
</style>
