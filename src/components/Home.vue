<template>
  <main class="flex flex-center">
    <page-loader v-if="isLoading"></page-loader>
    <section v-if="!showModal && !isLoading" class="flex column flex-center actions">
      <button class="italic mb-3" @click="gottaEat()">GottaEat</button>
      <div class="mb-2 slider-container flex column flex-center">
        <p class="pl-1 pb-2">Radius (Miles)</p>
        <vue-slider
          v-model="radius"
          :min="1" :max="5"
          :interval="1"
          :piecewise="true"
          width="100%"
          :bgStyle="{ 'background-color': '#FF9A8A' }"
          :sliderStyle="{ 'background-color': '#CE3323'}"
          :tooltipStyle="{ 'background-color': '#E74C3C', 'border-color': '#E74C3C' }"
          :processStyle="{ 'background-color': '#E74C3C' }" >
        </vue-slider>
      </div>
      <div class="slider-container flex column flex-center">
        <p class="pl-1 pb-2">Price Range (1 - Cheapest, 5 - Most expensive)</p>
        <vue-slider
          v-model="price"
          :min="1" :max="5"
          :interval="1"
          :piecewise="true"
          width="100%"
          :bgStyle="{ 'background-color': '#FF9A8A' }"
          :sliderStyle="{ 'background-color': '#CE3323'}"
          :tooltipStyle="{ 'background-color': '#E74C3C', 'border-color': '#E74C3C' }"
          :processStyle="{ 'background-color': '#E74C3C' }" >
        </vue-slider>
      </div>
    </section>
    <location-modal :url="locationUrl" v-if="showModal" v-on:close="showModal = false"></location-modal>
  </main>
</template>

<script>
import VueSlider from 'vue-slider-component'
import geo from 'vue-browser-geolocation'
import LocationModal from '@/components/LocationModal.vue'
import PageLoader from '@/components/PageLoader.vue'

export default {
  name: 'Home',
  data () {
    return {
      radius: 3,
      price: [1, 5],
      showModal: false,
      location: {},
      locationUrl: '',
      isLoading: false
    }
  },
  components: {
    VueSlider,
    LocationModal,
    PageLoader
  },
  methods: {
    gottaEat: function() {
      // this.locationUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCsvltI-QXGXkrFAPf_BlazIrYLKH4lcmE&q=place_id:" + $scope.restaurant.place_id'
      this.locationUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCsvltI-QXGXkrFAPf_BlazIrYLKH4lcmE&q=5429%20Langsworth%20Dr.'
      this.showModal = true
    }
  },
  async created() {
    var self = this

    self.isLoading = true
    geo.getLocation()
      .then(coordinates => {
        self.location = coordinates
      })
      .catch(function() {
        self.location = ''
      })
      .finally(function() {
        self.isLoading = false
      })
  }
}
</script>

<style lang="scss" scoped>
  main {
    height: 100vh;

    .actions {
      width: 100%;
    }

    .slider-container {
      width: 60%;

      p {
        align-self: flex-start;
      }
    }
  }
</style>
