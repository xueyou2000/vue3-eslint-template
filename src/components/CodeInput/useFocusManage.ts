import { ref, Ref, watchEffect } from 'vue'
import { useFocus, UseFocusReturn } from '@vueuse/core'

export function useFocusManage(length: number) {
  const inputRefs = ref<Array<HTMLInputElement>>()
  const focusStates = ref([]) as Ref<Array<UseFocusReturn>>

  function setForcus(index: number) {
    if (index >= 0 && index < length) {
      focusStates.value.forEach((state, i) => {
        state.focused.value = i === index
      })
    }
  }

  watchEffect(() => {
    const refs = inputRefs.value || []
    focusStates.value = refs.map((input, i) => useFocus(input))
  })

  return { inputRefs, focusStates }
}
