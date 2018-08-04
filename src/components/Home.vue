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
    <location-modal :error="modalError" :loading="modalLoading" :url="locationUrl" v-if="showModal" v-on:close="showModal = false"></location-modal>
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
      modalLoading: false,
      modalError: false,
      coords: {},
      locationUrl: '',
      isLoading: false,
      restaurants: [],
      randRestaurant: {}
    }
  },
  components: {
    VueSlider,
    LocationModal,
    PageLoader
  },
  methods: {
    gottaEat() {
      this.showModal = true
      this.modalLoading = true

      if (this.restaurants.length > 0) {
        this.pickRestaurant()
      } else {
        this.getRestaurants()
      }
    },
    getRestaurants() {
      var self = this

      // eslint-disable-next-line
      const googleCoords = new google.maps.LatLng(this.coords.lat, this.coords.lng)

      const body = {
        location: googleCoords,
        radius: 1609 * this.radius,
        minPriceLevel: this.price[0] - 1,
        maxPriceLevel: this.price[1] - 1,
        types: ['restaurant'],
        openNow: true
      }

      // It needs an element to hook into
      // This also behaves like a promise
      // eslint-disable-next-line
      var service = new google.maps.places.PlacesService(document.createElement('div'))
      service.nearbySearch(body, function(results, status, page) {
        // eslint-disable-next-line
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          self.restaurants = self.restaurants.concat(results)
          if (page.hasNextPage) {
            page.nextPage()
          } else {
            self.pickRestaurant()
          }
        // eslint-disable-next-line
        } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          self.modalError = 'ZERO'
        } else {
          self.modalError = 'ERROR'
        }
      })
    },
    pickRestaurant() {
      const random = Math.floor((Math.random() * this.restaurants.length))
      this.randRestaurant = this.restaurants[random]
      this.modalLoading = false
      this.locationUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCsvltI-QXGXkrFAPf_BlazIrYLKH4lcmE&q=place_id:${this.randRestaurant.place_id}`
    }
  },
  async created() {
    var self = this

    self.isLoading = true
    geo.getLocation({timeout: 5000})
      .then(coordinates => {
        self.coords = coordinates
      })
      .catch(function() {
        self.coords = ''
      })
      .finally(function() {
        console.log(self.coords)
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
