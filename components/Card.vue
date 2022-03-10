<template>
  <div>
    <!-- <div class="column"> -->
    <div id="card" class="card">
      <a v-bind:id="aCardID" @click="showModalPROP">
        <div class="card-image">
          <client-only>
            <p id="similarMini">Similar</p>
            <div id="backGround"></div>
            <CircleProgress id="cpidMini" :value="seriesRate" :options="options" />
          </client-only>
          <figure class="image is-3by4">
<!--            <img v-bind:src="`/img-webp/` + seriesId + `.webp`" />-->
            <picture>
              <source v-bind:srcset="`/img/` + seriesId + `.webp`" type="image/webp">
              <source v-bind:srcset="`/img/` + seriesId + `.jpg`" type="image/jpg">
              <img v-bind:src="`/img/` + seriesId + `.jpg`"  alt=""/>
            </picture>
          </figure>
        </div>
        <div class="card-content is-size-6 has-text-centered">
          <p id="cardName" class="has-text-weight-semibold has-text-black">{{ seriesName }}</p>
          <p id="cardHang" class="has-text-dark is-size-7">{{ seriesHang }}</p>
          <p id="cardYear" class="has-text-weight-medium has-text-black">{{ seriesYear }}</p>
        </div>
      </a>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "Card",
  props: ["seriesName", "seriesHang", "seriesYear", "seriesRate", "seriesId", "showModalPROP", "aCardID"],
  components: {
    CircleProgress: () => process.client ? import("vuejs-progress-bar") : null
  },
  data() {
    return {
      isMobile: () => (window.innerWidth <= 768),
      similarTo: "Something in the Rainx",

      options: {
        text: {
          color: "#FFC107",
          shadowEnable: false,
          shadowColor: '',
          fontSize: 20,
          fontFamily: 'Ubuntu',
          hideText: false
        },
        progress: {
          color: '#DC3545',
          backgroundColor: 'white',
          inverted: false
        },
        layout: {
          height: 60,
          width: 60,
          verticalTextAlign: 31,
          horizontalTextAlign: 11,
          strokeWidth: 9,
          type: 'circle'
        }
      }
    }
  }
}
</script>
z"
