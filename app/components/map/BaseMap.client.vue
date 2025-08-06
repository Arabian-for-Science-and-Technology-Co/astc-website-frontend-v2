<template>
  <div ref="mapContainer" class="h-full w-full"></div>
</template>

<script setup>
const mapContainer = ref(null)
const { $googleMapsLoader } = useNuxtApp()

// Default map options

const props = defineProps({
  center: {
    type: Object,
    default: { lat: -34.397, lng: 150.644 }
  },
  zoom: {
    type: Number,
    default: 8
  }
})

onMounted(async () => {
  try {
    const google = await $googleMapsLoader.load()
    new google.maps.Map(mapContainer.value, {
      center: props.center,
      zoom: props.zoom,
      disableDefaultUI: true // Customize UI here
    })
  } catch (error) {
    console.error('Google Maps failed to load:', error)
  }
})
</script>
