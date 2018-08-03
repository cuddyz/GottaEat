<template>
  <section class="absolute flex">
    <div class="actions">
      <i class="fas fa-times p-50"></i>
    </div>
    <div class="map-wrapper">
      <iframe
        id="map"
        frameborder="0"
        :src="url">
      </iframe>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LocationModal',
  props: ['url']
}
</script>

<style lang="scss" scoped>
  @import '../styles/colors.scss';

  section {
    height: 60vh;
    width: 40vw;
    top: 10%;
    border-radius: 5px;
    background-color: color(red);
    z-index: 10;

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
        height: 85%;
        width: 85%;
      }
    }
  }
</style>
