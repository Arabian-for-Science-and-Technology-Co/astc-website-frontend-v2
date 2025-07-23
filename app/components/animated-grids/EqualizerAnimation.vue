<template>
  <div class="equalizer-container">
    <div class="equalizer">
      <div v-for="(_, rowIndex) in rows" :key="rowIndex" class="row">
        <div
          v-for="(_, colIndex) in cols"
          :key="colIndex"
          class="dot"
          :class="{ active: isActive(rowIndex, colIndex) }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Configuration
const config = {
  rows: 14,
  cols: 14,
  minActive: 1,
  maxActive: 5,
  fillSpeed: 100,
  clearSpeed: 80,
  pauseAfterFill: 300,
  pauseAfterClear: 200,
  rowDelay: 150
}

// Reactive state
const activeDots = ref(Array.from({ length: config.rows }, () => Array(config.cols).fill(false)))

// Animation controllers
const animationTimeouts = ref([])

// Initialize grid dimensions
const rows = Array(config.rows).fill(null)
const cols = Array(config.cols).fill(null)

// Dot activation helper
const isActive = (row, col) => activeDots.value[row][col]

// Animation functions
const animateRow = (row) => {
  let cancelled = false
  let currentTimeout = null

  const cycle = () => {
    if (cancelled) return

    const targetCount =
      Math.floor(Math.random() * (config.maxActive - config.minActive + 1)) + config.minActive

    const fill = (index) => {
      if (cancelled || index >= config.cols) return

      if (index < targetCount) {
        // Update dot state reactively
        activeDots.value[row][index] = true
        currentTimeout = setTimeout(() => fill(index + 1), config.fillSpeed)
        animationTimeouts.value.push(currentTimeout)
      } else {
        currentTimeout = setTimeout(clear, config.pauseAfterFill)
        animationTimeouts.value.push(currentTimeout)
      }
    }

    const clear = () => {
      if (cancelled) return

      let index = targetCount - 1
      const clearNext = () => {
        if (cancelled || index < 0) {
          if (!cancelled) {
            currentTimeout = setTimeout(cycle, config.pauseAfterClear)
            animationTimeouts.value.push(currentTimeout)
          }
          return
        }

        activeDots.value[row][index] = false
        index--
        currentTimeout = setTimeout(clearNext, config.clearSpeed)
        animationTimeouts.value.push(currentTimeout)
      }

      clearNext()
    }

    fill(0)
  }

  // Start first cycle with row delay
  currentTimeout = setTimeout(cycle, row * config.rowDelay)
  animationTimeouts.value.push(currentTimeout)

  // Return cleanup function
  return () => {
    cancelled = true
    if (currentTimeout) clearTimeout(currentTimeout)
  }
}

// Lifecycle hooks
onMounted(() => {
  const cancelFunctions = []
  for (let row = 0; row < config.rows; row++) {
    cancelFunctions.push(animateRow(row))
  }

  // Cleanup on unmount
  onUnmounted(() => {
    cancelFunctions.forEach((cancel) => cancel())
    animationTimeouts.value.forEach((timeout) => clearTimeout(timeout))
  })
})
</script>

<style scoped>
.equalizer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;
  background-color: transparent;
  overflow: hidden;
}

.equalizer {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--grid-v-gap);
  width: 320px;
  height: auto;
}

.row {
  display: flex;
  gap: var(--grid-h-gap);
}

.dot {
 height: var(--grid-height);
  width: var(--grid-width);
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.1s linear;
}

.dot.active {
  background-color: var(--grid-color);
}
</style>
