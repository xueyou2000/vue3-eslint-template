<template>
  <li class="verify-input-item" :class="{ focused }">
    <div
      class="mock-input"
      tabindex="1"
      contenteditable
      :type="type"
      ref="inputRef"
      v-text="showContext"
      @input="onInput"
      @paste="onPaste"
      @focus="$emit('focus', $event)"
      @keydown="KeyboardEvent"
    ></div>
  </li>
</template>

<script setup lang="ts">
import { useFocus } from '@vueuse/core'
import { computed, nextTick, ref, watch, watchEffect } from 'vue'
import { ValueWitchEmpty, VerifyInputItemEvents, VerifyInputItemProps } from './types'

const emits = defineEmits<VerifyInputItemEvents>()
const props = withDefaults(defineProps<VerifyInputItemProps>(), {
  type: 'text'
})
const showContext = computed(() => getContext(props.modelValue))

function getContext(str: ValueWitchEmpty) {
  if (!str) return ''
  return props.type == 'text' ? str : '*'
}

const inputRef = ref<HTMLDivElement>()
const { focused } = useFocus(inputRef)

function onInput(event: Event) {
  const target = event.target as HTMLDivElement
  const content = (target?.innerText || '').trim()
  if (content) {
    const lastChar = content.slice(-1)
    emits('update:modelValue', lastChar)
    target.innerText = getContext(lastChar)
  } else {
    emits('clear')
  }
}

function KeyboardEvent(event: KeyboardEvent) {
  if (event.key === 'Backspace') {
    emits('clear', !props.modelValue)
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

function syncContent() {
  const ele = inputRef.value
  if (ele) {
    ele.innerText = props.modelValue ? showContext.value : ''
  }
}

function toCursorEnd() {
  const ele = inputRef.value
  const selection = window.getSelection ? window.getSelection() : null
  if (selection && ele) {
    ele.focus()
    selection.selectAllChildren(ele)
    selection.collapseToEnd()
  }
}

watchEffect(() => {
  if (focused.value) {
    // fix: setTimeout修复无法将光标设置在末尾
    setTimeout(() => {
      toCursorEnd()
    }, 10)
  }
})

watch(
  () => props.focused,
  (focus) => {
    focused.value = focus
    syncContent()
  }
)

// TODO: 尝试使用点击label方式， 实际焦点到input来实现拉起键盘
defineExpose({
  focus() {
    focused.value = false
    setTimeout(() => {
      focused.value = true
      inputRef.value?.focus()
    }, 10)
  }
})
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
