<template>
  <div class="h-full w-full rounded-3xl overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-900">
    <l-map
      ref="map"
      v-model:zoom="currentZoom"
      v-model:center="currentCenter"
      :use-global-leaflet="false"
      class="h-full w-full z-10"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>

      <l-marker
        v-for="listing in listingsWithCoords"
        :key="listing.id"
        :lat-lng="[listing.gps.lat, listing.gps.lng]"
        @click="$emit('marker-click', listing)"
      >
        <l-popup>
          <div class="p-2 min-w-[150px]">
            <h4 class="font-black text-sm mb-1">{{ listing.titre }}</h4>
            <p class="text-primary font-bold text-xs">{{ formatPrice(listing.prix) }} GNF</p>
            <p class="text-[10px] text-gray-500 mt-1">{{ listing.localisation }}</p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

const props = defineProps({
  listings: {
    type: Array,
    default: () => []
  },
  zoom: {
    type: Number,
    default: 13
  },
  center: {
    type: Array,
    default: () => [9.6412, -13.5784]
  }
});

const emit = defineEmits(['marker-click', 'update:zoom', 'update:center']);

const map = ref(null);

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-GN', {
    style: 'currency',
    currency: 'GNF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const onMarkerClick = (listing) => {
  emit('marker-click', listing);
};
</script>

<style>
/* Fix pour Leaflet dans Vue */
.leaflet-pane {
  z-index: 1 !important;
}
</style>
