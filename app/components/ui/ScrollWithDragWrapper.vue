<template>
  <div
    class="scrollWrapper"
    ref="wrapperRef"
    @mousedown="startDragging"
    @mouseleave="stopDragging"
    @mouseup="stopDragging"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
const wrapperRef = ref(null)

const startDragging = (e) => {
  isDragging.value = true
  startX.value = e.pageX - wrapperRef.value.offsetLeft
  scrollLeft.value = wrapperRef.value.scrollLeft
  wrapperRef.value.classList.add('dragging')
  document.addEventListener('mousemove', handleDragging)
  document.addEventListener('mouseup', stopDragging)
  e.preventDefault()
}

const stopDragging = () => {
  isDragging.value = false
  wrapperRef.value?.classList.remove('dragging')
  document.removeEventListener('mousemove', handleDragging)
  document.removeEventListener('mouseup', stopDragging)
}

const handleDragging = (e) => {
  if (!isDragging.value || !wrapperRef.value) return
  const x = e.pageX - wrapperRef.value.offsetLeft
  const walk = (x - startX.value) * 1.5 // control scroll speed
  wrapperRef.value.scrollLeft = scrollLeft.value - walk
}

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleDragging)
  document.removeEventListener('mouseup', stopDragging)
})
</script>

<style scoped>
.scrollWrapper {
  width: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 10px;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  scroll-behavior: smooth;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.scrollWrapper.dragging {
  cursor: grabbing;
  scroll-behavior: auto; /* disable smooth scroll while dragging */
}

.scrollWrapper::-webkit-scrollbar {
  display: none;
}
</style>
