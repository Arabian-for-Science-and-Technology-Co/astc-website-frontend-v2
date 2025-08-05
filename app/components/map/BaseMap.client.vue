<template>
  <div ref="mapContainer" class="h-full w-full"></div>
</template>
<script setup>
import { ref, nextTick, onMounted } from 'vue'
const mapContainer = ref(null)
const map = ref(null)
const { $googleMapsLoader } = useNuxtApp()

onMounted(async () => {
  await nextTick()
  await $googleMapsLoader.load()
  map.value = new google.maps.Map(mapContainer.value, {
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 12,
    mapTypeId: 'roadmap'
  })
  // Add markers, infoWindow, directionsRenderer, etc.
})
</script>
