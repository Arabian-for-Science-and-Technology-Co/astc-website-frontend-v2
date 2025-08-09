<template>
  <div ref="mapContainer" class="h-full w-full"></div>
</template>

<script setup>
import standardStyle from '~/assets/maps-standard.json'

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
    default: 12
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
function getMapOptions() {
  const google = window.google
  return {
    center: props.center,
    zoom: props.zoom,
    mapTypeId: google.maps.MapTypeId.HYBRID, // or SATELLITE / ROADMAP
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    }
  }
}
onMounted(async () => {
  try {
    const google = await $googleMapsLoader.load()

    const map = new google.maps.Map(mapContainer.value, getMapOptions())

    mapInstance.value = map
    directionsRenderer.value = new google.maps.DirectionsRenderer({ map })
    placesService = new google.maps.places.PlacesService(map)

    renderMarkers()
    applyMapAction(props.type)
  } catch (error) {
    console.error('Google Maps failed to load:', error)
  }
})

watch(
  () => props.type,
  (newVal) => {
    if (mapInstance.value) {
      resetMapSettings()
      clearMap()

      // only render markers if the type is NOT using directions
      if (newVal !== 'get-from-the-airport') {
        renderMarkers()
      }

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
    const marker = new google.maps.Marker({
      position: markerData,
      map: mapInstance.value
    })

    // ✅ Create InfoWindow with link
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div>
          <a 
            href="https://www.google.com/maps?q=${markerData.lat},${markerData.lng}" 
            target="_blank"
            style="text-decoration: none; color: #4285F4; height:20px;"
          >
            View on Google Maps
          </a>
        </div>
      `
    })

    // ✅ Add click listener
    marker.addListener('click', () => {
      infoWindow.open(mapInstance.value, marker)
    })

    return marker
  })
}

// Clean up markers and directions
function clearMap() {
  directionsRenderer.value.set('directions', null)

  markerRefs.forEach((marker) => marker.setMap(null))
  markerRefs = []
}
function resetMapSettings() {
  const google = window.google
  if (!mapInstance.value) return
  const options = getMapOptions(props.center, props.zoom)
  // Apply center, zoom, and type
  mapInstance.value.setCenter(options.center)
  mapInstance.value.setZoom(options.zoom)
  mapInstance.value.setMapTypeId(options.mapTypeId)

  // Clear directions and markers
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
      // mapInstance.value.setMapTypeId(google.maps.MapTypeId.SATELLITE)
      break

    case 'get-from-the-airport':
      if (!props.airportPosition) {
        findNearestAirport(props.center)
      } else {
        drawRouteFromAirport(props.airportPosition)
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
        directionsRenderer.value.setOptions({
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: '#0F53FF',
            strokeWeight: 5,
            strokeOpacity:0.7,
          }
        })

        directionsRenderer.value.setDirections(result)

        // ✅ Fix: fit map view to show entire route
        const bounds = new google.maps.LatLngBounds()
        result.routes[0].overview_path.forEach((point) => bounds.extend(point))
        mapInstance.value.fitBounds(bounds)

        const leg = result.routes[0].legs[0]

        const originMarker = new google.maps.Marker({
          position: leg.start_location,
          map: mapInstance.value,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'white',
            fillOpacity: 1,
            scale: 6,
            strokeColor: '#A9AEB8',
            strokeWeight: 2
          }
        })

        const destinationMarker = new google.maps.Marker({
          position: leg.end_location,
          map: mapInstance.value
        })

        markerRefs.push(originMarker, destinationMarker)
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
