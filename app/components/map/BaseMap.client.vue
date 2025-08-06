<template>
  <div ref="mapContainer" class="h-full w-full"></div>
</template>

<script setup>
const mapContainer = ref(null)
const { $googleMapsLoader } = useNuxtApp()

const props = defineProps({
  center: {
    type: Object,
    default: () => ({ lat: -34.397, lng: 150.644 })
  },
  zoom: {
    type: Number,
    default: 8
  },
  markers: {
    type: Array,
    default: () => [] // Example: [{ lat: ..., lng: ... }, ...]
  }
})

onMounted(async () => {
  try {
    const google = await $googleMapsLoader.load()

    const map = new google.maps.Map(mapContainer.value, {
      center: props.center,
      zoom: props.zoom
    })

    // Add markers
    props.markers.forEach((markerData) => {
      new google.maps.Marker({
        position: markerData,
        map
      })
    })
  } catch (error) {
    console.error('Google Maps failed to load:', error)
  }
})
</script>
