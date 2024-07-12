<template>
  <div ref="mapContainer" id="map" class="w-full h-[600px]"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import '@types/google.maps'
export default defineComponent({
  name: 'GoogleMap',
  setup() {
    const mapContainer = ref<HTMLElement | null>(null)
    const marker = ref<google.maps.Marker | null>(null)
    const initMap = () => {
      if (mapContainer.value) {
        const mapOptions: google.maps.MapOptions = {
          zoom: 10,
          center: { lat: 55.6761, lng: 12.5683 }
        }

        const map = new google.maps.Map(mapContainer.value, mapOptions)

        // Add a marker
        marker.value = new google.maps.Marker({
          position: { lat: 55.6761, lng: 12.5683 },
          map: map,
          title: 'Copenhagen'
        })
      }
    }

    onMounted(() => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry,drawing,places&language=da`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    })

    return {
      mapContainer
    }
  }
})
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
