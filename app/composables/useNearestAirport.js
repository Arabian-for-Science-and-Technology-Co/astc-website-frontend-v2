import { ref } from 'vue'
import { useNuxtApp } from '#imports'

export function useNearestAirport(initialCenter) {
  const nearestAirport = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const { $googleMapsLoader } = useNuxtApp()

  async function findNearestAirport() {
    // If we already found one, don’t search again
    if (nearestAirport.value || isLoading.value) return

    isLoading.value = true
    error.value = null

    try {
      const google = await $googleMapsLoader.load()

      // You can attach PlacesService to a dummy div if you don't have a map
      const service = new google.maps.places.PlacesService(document.createElement('div'))

      await new Promise((resolve, reject) => {
        service.nearbySearch(
          {
            location: initialCenter,
            radius: 50000,
            // rankBy: google.maps.places.RankBy.DISTANCE,
            type: 'airport' // restricts to airports:contentReference[oaicite:3]{index=3}
          },
          (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
              const loc = results[0].geometry.location
              nearestAirport.value = { lat: loc.lat(), lng: loc.lng() }
              resolve()
            } else {
              reject(new Error(`No nearby airport found (status: ${status})`))
            }
          }
        )
      })
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return { nearestAirport, findNearestAirport, isLoading, error }
}
