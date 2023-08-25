<script setup lang="ts">
defineEmits<{
  (event: 'click'): void
}>()
</script>

<template>
  <div class="shadow-button" @click="$emit('click')">
    <div class="shadow-button__wrapper">
      <span class="button-bg gradient bg-1" aria-hidden="true"></span>
      <span class="button-bg gradient bg-2" aria-hidden="true"></span>
      <span class="button-bg gradient bg-3" aria-hidden="true"></span>
      <a class="button-actual" role="button" tabindex="0">
        <span class="button_content">
          <slot></slot>
        </span>
      </a>
    </div>
  </div>
</template>

<style lang="less">
.shadow-button {
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 1px;
  max-width: 100%;
  flex: 1;
  justify-content: flex-start;
  align-items: stretch;
  box-sizing: border-box;
  --geist-radius: 5px;
  --start-color: #00dfd8;
  --end-color: #007cf0;

  .shadow-button__wrapper {
    box-sizing: border-box;
  }
  .button-bg {
    border-radius: var(--geist-radius);
    content: '';
    height: 100%;
    position: absolute;
    width: 100%;
    // z-index: -2;
    left: 0;

    &.gradient {
      &::before {
        border: 12px solid transparent;
        background-clip: padding-box;
        content: '';
        filter: blur(36px);
        height: 100%;
        opacity: 0.8;
        position: absolute;
        left: 0;
        width: 100%;
        z-index: -1;
      }
    }
  }

  .bg-1 {
    --start-color: #00dfd8;
    --end-color: #007cf0;
    background-image: linear-gradient(165deg, var(--start-color), var(--end-color));
    animation: background-1 8s infinite;

    &::before {
      background-image: linear-gradient(165deg, var(--start-color), var(--end-color));
    }
  }

  .bg-2 {
    --start-color: #ff0080;
    --end-color: #7928ca;
    background-image: linear-gradient(165deg, var(--start-color), var(--end-color));
    animation: background-2 8s infinite;

    &::before {
      background-image: linear-gradient(165deg, var(--start-color), var(--end-color));
    }
  }

  .bg-3 {
    --start-color: #ff4d4d;
    --end-color: #f9cb28;
    background-image: linear-gradient(165deg, var(--start-color), var(--end-color));
    animation: background-3 8s infinite;

    &::before {
      background-image: linear-gradient(165deg, var(--start-color), var(--end-color));
    }
  }

  @keyframes background-1 {
    0%,
    16.667%,
    to {
      opacity: 1;
    }

    33%,
    83.333% {
      opacity: 0;
    }
  }
  @keyframes background-2 {
    0%,
    16.667%,
    66.667%,
    to {
      opacity: 0;
    }

    33.333%,
    50% {
      opacity: 1;
    }
  }
  @keyframes background-3 {
    0%,
    50%,
    to {
      opacity: 0;
    }

    66.667%,
    83.333% {
      opacity: 1;
    }
  }

  .button-actual {
    --geist-gap-half: 12px;
    --lighten-color: hsla(0, 0%, 100%, 0.8);
    font-weight: 500;
    padding: 0 var(--geist-gap-half);
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--geist-radius);
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    background: none;
    background-image: linear-gradient(to right, var(--lighten-color), var(--lighten-color));
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid transparent;
    box-shadow: 0 4px 4px 0 #00000010;
    color: #000;
    transition-property: color, background-color, box-shadow;
    transition-duration: 0.15s;
    transition-timing-function: ease;
    position: relative;
    z-index: 1;
  }

  .button_content {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }
}
</style>
