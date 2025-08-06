<template>
  <div ref="mapDiv" :style="{ width: width, height: height }">
    <div v-if="mapLoaded">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  zoom: { type: Number, default: 15 },
  height: { type: String, default: "500px" },
  width: { type: String, default: "500px" },
  center: { type: Object, required: true,default:{lat:151,lng:1515} },
  options: { type: Object, default: {} },
  disabled: { type: Boolean, default: false },
});

const emits = defineEmits(["click", "zoom"]);
const mapDiv = ref(null);
const map = ref(null);
provide("googleMapInstance", map); // provide the map instance to child components
const mapLoaded = ref(false);
const initializeMap = () => {
  if (!google.maps) {
    throw new Error("Google Maps API is not available");
  }

  return new Promise((resolve) => {
    map.value = new google.maps.Map(mapDiv.value, {
      center: {
        lat: Number(props.center?.lat),
        lng: Number(props.center?.lng),
      },
      zoom: props.zoom,
      mapId: "f3b7b1b3b1b3b1b3",
      styles: [],
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: true,
      scaleControl: false,
      attributionControl: true,
      overviewMapControl: false,
      disableDefaultUI: false,
      zoomControlOptions: {
        position: google?.maps?.ControlPosition?.LEFT_TOP,
      },
      ...props.options,
    });

    google.maps.event.addListenerOnce(map.value, "tilesloaded", () => {
      resolve(map.value);
    });
  });
};

watch(
  () => props.zoom,
  (newZoom) => {
    if (map.value?.getZoom?.() !== newZoom) {
      map.value?.setZoom?.(newZoom); // smooth transition
    }
  },
);

watch(
  () => props.center,
  (newCenter) => {
    if (
      map.value?.getCenter?.().lat?.() !== newCenter?.lat ||
      map.value?.getCenter?.().lng?.() !== newCenter?.lng
    ) {
      map.value?.panTo?.({
        lat: Number(newCenter?.lat),
        lng: Number(newCenter?.lng),
      }); // smooth transition
    }
  },
  { deep: true },
);
watch(
  () => props.options,
  (newOptions) => {
    if (map.value && newOptions) {
      map.value.setOptions(newOptions);
    }
  },
  { deep: true },
);
onMounted(async () => {
  try {
    const { $googleMapsLoaded } = useNuxtApp(); // Access the promise
    await $googleMapsLoaded; // Wait for the API to load
    await initializeMap();
    mapLoaded.value = true;

    google.maps.event.addListener(map.value, "click", (event) => {
      const latLng = event.latLng;
      const zoomLevel = map.value.getZoom();
      const mapData = {
        lat: latLng.lat(),
        lng: latLng.lng(),
        zoom: zoomLevel,
      };
      !props.disabled && emits("click", mapData);
    });

    google.maps.event.addListener(map.value, "zoom_changed", () => {
      const currentZoom = map.value.getZoom();
      emits("zoom", currentZoom);
    });
  } catch (err) {
    console.error(err || "Google Maps API is not available");
  }
});
defineExpose({
  mapInstance: map,
});
</script>
<style >
.gmnoprint {
  margin-top: 140px;

  & > div {
    width: 34px !important;
    height: 68px !important;
  }

  button.gm-control-active:first-of-type,
  button.gm-control-active:last-of-type {
    width: 34px !important;
    height: 34px !important;
    background: var(--primary) !important;
    position: relative !important;
    border: 1px solid #d3d3d3 !important;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      background-size: contain;
      z-index: 5;
    }

    img {
      display: none !important;
      /* Hide the default image */
    }
  }

  button.gm-control-active:first-of-type {
    &::after {
      background: url("/icons/plus.svg") no-repeat center center;
    }
  }
  button.gm-control-active:last-of-type {
    &::after {
      background: url("/icons/minus.svg") no-repeat center center;
    }
  }
}

.gm-style-iw {
  padding: 0 !important;
  visibility: visible !important;
}

.gm-style-iw-chr {
  display: none !important;
}

.gm-style-iw-d {
  overflow: unset !important;
}
</style>
