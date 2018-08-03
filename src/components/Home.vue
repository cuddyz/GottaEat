<template>
  <main class="flex flex-center">
    <div class="flex column flex-center actions">
      <button class="italic mb-3">GottaEat</button>
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
    </div>
  </main>
</template>

<script>
import VueSlider from 'vue-slider-component'

export default {
  name: 'Home',
  data () {
    return {
      radius: 3,
      price: [1, 5]
    }
  },
  components: {
    VueSlider
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
