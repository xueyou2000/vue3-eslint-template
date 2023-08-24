<template>
  <div class="code-input">
    <ul class="input-ul">
      <template v-for="n in length" :key="n">
        <li class="input__li">
          <input type="text" ref="inputRefs" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
export default { name: 'CodeInput' }
</script>

<script setup lang="ts">
import { CodeInputProps, CodeInputEvents } from './types'
import { useFocusManage } from './useFocusManage'

defineEmits<CodeInputEvents>()
const props = withDefaults(defineProps<CodeInputProps>(), {
  length: 6
})

const { inputRefs, focusStates } = useFocusManage(props.length)
</script>

<style lang="less">
.code-input {
  .input-ul {
    display: flex;
    list-style: none;

    & > .input__li:not(:last-child) {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: whitesmoke;
      flex-shrink: 0;

      input {
        width: 100%;
        height: 100%;
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
}
</style>
