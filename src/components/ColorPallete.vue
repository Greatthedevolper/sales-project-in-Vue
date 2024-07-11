<script setup lang="ts">
import { defineEmits } from 'vue'
// const props = defineProps<{
//   clickColor?: Record<string, any>
// }>()

const emit = defineEmits(['colorSelected', 'modalClose'])

function handleColorChange(event: Event) {
  const input = event.target as HTMLInputElement
  emit('colorSelected', input.value)
}
function closeModal() {
  if (event?.target === event?.currentTarget) {
    emit('modalClose')
  }
}
</script>
<template>
  <div
    @click="closeModal"
    class="fixed bg-transparent top-0 start-0 w-full h-full z-40 flex items-center justify-center"
  >
    <div
      class="max-w-[300px] bg-[var(--primary-color)] rounded p-3 relative z-50 border border-white"
    >
      <label for="" class="form-custom-label">Choose Background Color</label>
      <input type="color" name="" id="" class="form-custom-input" @input="handleColorChange" />
    </div>
  </div>
</template>
