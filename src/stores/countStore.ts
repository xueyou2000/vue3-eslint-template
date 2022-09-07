import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  actions: {
    increment() {
      this.count++
    }
  }
})

// const counter = useCounterStore();
// counter.count++;
// counter.$patch({ count: counter.count + 1 });
// counter.increment();
