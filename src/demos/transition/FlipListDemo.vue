<script setup lang="ts">
import { ref } from 'vue'
import _ from 'lodash'

const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
const nextNum = ref(10)

function randomIndex() {
  return Math.floor(Math.random() * items.value.length)
}
function add() {
  items.value.splice(randomIndex(), 0, nextNum.value++)
}
function remove() {
  items.value.splice(randomIndex(), 1)
}
function shuffle() {
  items.value = _.shuffle(items.value)
}
</script>

<template>
  <div id="list-complete-demo" class="demo">
    <button @click="shuffle">Shuffle</button>
    <button @click="add">Add</button>
    <button @click="remove">Remove</button>
    <transition-group name="list-complete" tag="p">
      <span v-for="item in items" :key="item" class="list-complete-item">
        {{ item }}
      </span>
    </transition-group>
  </div>
</template>

<style>
.list-complete-item {
  transition: all 0.8s ease;
  display: inline-block;
  margin-right: 10px;
}

/* .list-complete-enter-active,
  .list-complete-leave-active {
    transition: all 1s ease;
  } */

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>
