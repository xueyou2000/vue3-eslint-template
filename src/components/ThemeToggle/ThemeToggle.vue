<template>
  <form>
    <fieldset class="theme-toggle-fieldset" name="theme">
      <template v-for="theme in THEMES" :key="theme">
        <label
          class="radio-item"
          :class="{ active: theme === currentTheme }"
          :for="`theme-radio_${theme}`"
          tabindex="0"
        >
          <input
            type="radio"
            name="theme"
            :id="`theme-radio_${theme}`"
            :value="theme"
            v-model="currentTheme"
            @change="changeTheme(theme)"
          />
          {{ THEME_INFO[theme] }}
        </label>
      </template>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

enum ThemeColor {
  auto = 'auto',
  light = 'light',
  dark = 'dark'
}

const THEME_INFO = {
  [ThemeColor.auto]: '系统',
  [ThemeColor.light]: '亮色',
  [ThemeColor.dark]: '暗色'
}

const THEMES = [...Object.values(ThemeColor)]
const currentTheme = ref<ThemeColor>(ThemeColor.auto)

function changeTheme(theme: ThemeColor) {
  const root = document.documentElement
  if (!root) return
  currentTheme.value = theme
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
}
</script>

<style lang="less">
.theme-toggle-fieldset {
  .radio-item {
    cursor: pointer;
    color: var(--text-primary);

    &:not(:last-child) {
      margin-right: 8px;
    }
    &:focus {
      input {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px 2px;
        transform: scale(0.9);
      }
    }

    &.active {
      color: var(--band-color);
    }
  }
}
</style>
