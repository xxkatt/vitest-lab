<script setup lang="ts">
import {ref} from 'vue'

defineProps<{title: string}>()
const emit = defineEmits<{change: [count: number]}>()
const count = ref(0)

const increment = () => {
  count.value++
  emit('change', count.value)
}
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <p>当前计数：{{ count }}</p>
    <button @click="increment">加一</button>
  </div>
</template>
