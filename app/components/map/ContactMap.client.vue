<template>
  <div class="h-full w-full">
    <iframe
      v-if="type === 'get-from-the-airport' && embedUrl"
      :src="embedUrl"
      width="100%"
      height="100%"
      style="border: 0"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>

    <BaseMap
      v-else
      :center="center"
      :zoom="zoom"
      :markers="markers"
      :type="type"
      :airport-position="airportPosition"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  center: { type: Object, required: true },
  zoom: { type: Number, default: 12 },
  markers: { type: Array, default: () => [] },
  type: { type: String, default: '' },
  airportPosition: { type: Object, default: null }
})

// Your Google API key must be allowed for the Maps Embed API as well.
 const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// Compute the embed URL only when needed.
const embedUrl = computed(() => {
  if (props.type !== 'get-from-the-airport') return null

  const origin = props.airportPosition
    ? `${props.airportPosition.lat},${props.airportPosition.lng}`
    : `${props.center.lat},${props.center.lng}`

  const destination = `${props.center.lat},${props.center.lng}`

  return `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}&mode=driving`
})
</script>
