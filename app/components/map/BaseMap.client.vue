<template>
  <div ref="mapContainer" class="h-full w-full"></div>
</template>

<script setup>
import { watch } from 'vue'

const mapContainer = ref(null)
const mapInstance = ref(null)
const directionsRenderer = ref(null)

const { $googleMapsLoader } = useNuxtApp()

const props = defineProps({
  center: {
    type: Object,
    required: true // passed as `:center="position"`
  },
  zoom: {
    type: Number,
    default: 10
  },
  markers: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: ''
  },
  airportPosition: {
    type: Object,
    default: null
  }
})

let placesService = null
let markerRefs = []

onMounted(async () => {
  try {
    const google = await $googleMapsLoader.load()

    const map = new google.maps.Map(mapContainer.value, {
      center: props.center,
      zoom: props.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    })

    mapInstance.value = map
    directionsRenderer.value = new google.maps.DirectionsRenderer({ map })
    placesService = new google.maps.places.PlacesService(map)

    renderMarkers()
    applyMapAction(props.type)
  } catch (error) {
    console.error('Google Maps failed to load:', error)
  }
})

// Watch for tab change
watch(
  () => props.type,
  (newVal) => {
    if (mapInstance.value) {
      clearMap()
      renderMarkers()
      applyMapAction(newVal)
    }
  }
)

// Watch for center change (reactivity)
watch(
  () => props.center,
  (newCenter) => {
    if (mapInstance.value) {
      mapInstance.value.setCenter(newCenter)
    }
  }
)

// Add markers from props
function renderMarkers() {
  const google = window.google
  markerRefs = props.markers.map((markerData) => {
    return new google.maps.Marker({
      position: markerData,
      map: mapInstance.value
    })
  })
}

// Clean up markers and directions
function clearMap() {
  directionsRenderer.value.set('directions', null)

  markerRefs.forEach((marker) => marker.setMap(null))
  markerRefs = []
}

// Handle actions based on tab
function applyMapAction(type) {
  const google = window.google
  if (!mapInstance.value) return

  switch (type) {
    case 'map':
      mapInstance.value.setMapTypeId(google.maps.MapTypeId.SATELLITE)
      break

    case 'get-from-the-airport':
      if (!props.airportPosition) {
        findNearestAirport(props.center)
      } else {
        drawRouteFromAirport(props.airportPosition)
      }
      break
    case 'road-from-nearest-airport':
      if (!props.airportPosition) {
        findNearestAirport1(props.center)
      } else {
        drawRouteFromAirport1(props.airportPosition)
      }
      break

    case 'hotels-around':
      searchNearby('hotel')
      break

    case 'nearest-metro-station':
      searchNearby('subway_station')
      break

    default:
      mapInstance.value.setMapTypeId(google.maps.MapTypeId.ROADMAP)
      break
  }
}
function findNearestAirport1(center, fullDirections = false) {
  const google = window.google

  const request = {
    location: center,
    radius: 50000,
    keyword: 'airport'
  }

  placesService.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
      const nearestAirport = results[0].geometry.location
      if (fullDirections) {
        drawRouteFromAirport(nearestAirport, true)
      } else {
        drawRouteFromAirport(nearestAirport)
      }
    } else {
      console.error('No nearby airports found or request failed:', status)
    }
  })
}
function drawRouteFromAirport1(origin, full = false) {
  const google = window.google
  const directionsService = new google.maps.DirectionsService()

  directionsService.route(
    {
      origin,
      destination: props.center,
      travelMode: google.maps.TravelMode.DRIVING
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.value.setDirections(result)

        const leg = result.routes[0].legs[0]

        // Clear previous markers
        clearMap()

        // ✅ Add markers for origin & destination
        const originMarker = new google.maps.Marker({
          position: leg.start_location,
          map: mapInstance.value,
          title: 'Airport'
        })

        const destinationMarker = new google.maps.Marker({
          position: leg.end_location,
          map: mapInstance.value,
          title: 'Your Location'
        })

        markerRefs.push(originMarker, destinationMarker)

        // ✅ Show panel
        if (full) {
          routeSummary.value = {
            duration: leg.duration.text,
            distance: leg.distance.text,
            mode: 'car'
          }
        }
      } else {
        console.error('Failed to fetch directions', status)
      }
    }
  )
}
function drawRouteFromAirport(origin) {
  const google = window.google
  const directionsService = new google.maps.DirectionsService()

  directionsService.route(
    {
      origin,
      destination: props.center,
      travelMode: google.maps.TravelMode.DRIVING
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.value.setDirections(result)
      } else {
        console.error('Failed to fetch directions', status)
      }
    }
  )
}
function findNearestAirport(center) {
  const google = window.google

  const request = {
    location: center,
    radius: 50000, // in meters (adjust based on expected area)
    keyword: 'airport'
  }

  placesService.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
      const nearestAirport = results[0].geometry.location
      drawRouteFromAirport(nearestAirport)
    } else {
      console.error('No nearby airports found or request failed:', status)
    }
  })
}
// Search nearby places (hotels, metro, etc.)
function searchNearby(keyword) {
  const google = window.google
  const request = {
    location: props.center,
    radius: 3000,
    keyword
  }

  placesService.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      markerRefs = results.map(
        (place) =>
          new google.maps.Marker({
            map: mapInstance.value,
            position: place.geometry.location,
            title: place.name
          })
      )
    } else {
      console.error('Places search failed:', status)
    }
  })
}
</script>
