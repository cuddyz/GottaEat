<template>
  <main class="flex flex-center">
    <section v-if="!showModal" class="flex column flex-center actions">
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

export default {
  name: 'Home',
  data () {
    return {
      radius: 3,
      cachedRadius: 0,
      price: [1, 5],
      cachedPrice: [0, 0],
      showModal: false,
      modalLoading: false,
      modalError: false,
      coords: {},
      locationUrl: '',
      restaurants: [],
      randRestaurant: {}
    }
  },
  components: {
    VueSlider,
    LocationModal
  },
  computed: {
    querySame: function() {
      return this.cachedRadius === this.radius && this.cachedPrice[0] === this.price[0] && this.cachedPrice[1] === this.price[1]
    }
  },
  methods: {
    gottaEat() {
      var self = this

      self.showModal = true
      self.modalLoading = true

      if (self.querySame) {
        self.pickRestaurant()
      } else {
        geo.getLocation({timeout: 15000})
          .then(coordinates => {
            self.coords = coordinates
          })
          .catch(function(error) {
            console.log(error)
            self.coords = ''
            self.modalError = 'LOC'
            self.modalLoading = false
          })
          .finally(function() {
            if (self.coords) {
              self.getRestaurants()
            }
          })
      }
    },
    getRestaurants() {
      var self = this

      // eslint-disable-next-line
      const googleCoords = new google.maps.LatLng(self.coords.lat, self.coords.lng)

      const body = {
        location: googleCoords,
        radius: 1609 * self.radius,
        minPriceLevel: self.price[0] - 1,
        maxPriceLevel: self.price[1] - 1,
        types: ['restaurant'],
        openNow: true
      }

      // Save on extra API calls, watchers were being a pain
      self.cachedRadius = self.radius
      self.cachedPrice = self.price

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
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/breaks';
  main {
    height: 100vh;

    .actions {
      width: 100%;
    }

    .slider-container {
      width: 60%;

      @media (max-width: breaks(phablet)) {
        width: 80%;
      }

      .vue-slider-component {
        @media (max-width: breaks(phablet)) {
          padding-top: 2rem !important;
          padding-bottom: 2rem !important;
        }
      }

      p {
        align-self: flex-start;
      }
    }
  }
</style>
