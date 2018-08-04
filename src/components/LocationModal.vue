<template>
  <section class="absolute flex">
    <div class="actions">
      <i @click="$emit('close')" class="fas fa-times p-50"></i>
    </div>
    <div v-if="loading" class="relative flex flex-center loading-container">
      <loader></loader>
    </div>
    <div v-if="!loading && !error" class="map-wrapper">
      <iframe
        id="map"
        frameborder="0"
        :src="url"
        allowtransparency="true"
        style="background-color: #EEEEEE;"
        allowfullscreen >
      </iframe>
    </div>
    <p v-if="error === 'ZERO'">Zero Results Found. Adjusting the sliders may help.</p>
    <p v-if="error === 'LOC'">This app needs your location to find restaurants near you.  Please update your settings.</p>
    <p v-if="error === 'ERROR'">Something Bad Happened. Try again in a few minutes.</p>
  </section>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
  name: 'LocationModal',
  props: ['url', 'loading', 'error'],
  components: {
    Loader
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/colors.scss';
  @import '../styles/breaks.scss';

  section {
    height: 60vh;
    width: 40vw;
    top: 10%;
    border-radius: 5px;
    background-color: color(red);
    z-index: 10;

    @media (max-width: breaks(laptop)) {
        width: 80vw;
    }

    @media (max-width: breaks(phone)) {
        width: 95vw;
        height: 45vh;
    }

    .actions {
      position: absolute;
      right: .5rem;

      i {
        color: color(black);
        opacity: 0.2;
        font-size: 1.5rem;

        &:hover {
          color: color(blackDark);
          opacity: 0.3;
          cursor: pointer;
        }
      }
    }

    .map-wrapper {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      iframe {
        background-color: colors(grey);
        height: 85%;
        width: 85%;
      }
    }

    .loading-container {
      width: 100%;
      height: 100%;
    }
  }
</style>
