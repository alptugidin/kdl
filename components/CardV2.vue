<template>
  <div>
    <div id="fakeCard" v-if="!isCircleProgressMounted">
      <div id="circleSkeleton">
        <b-skeleton :animated="true" circle :height="skeletonHeigth" :width="skeletonWidth"></b-skeleton>
      </div>
      <div id="infoSkeleton">
        <b-skeleton :animated="true" position="is-centered" id="nameSkeleton" width="70%"></b-skeleton>
        <b-skeleton :animated="true" position="is-centered" id="hangSkeleton" width="50%"></b-skeleton>
        <b-skeleton :animated="true" position="is-centered" id="yearSkeleton" width="50%"></b-skeleton>
      </div>
    </div>

    <div id="cardv2" class="card" :style="{display:displayBind}">
      <a v-bind:id="aCardID" @click="showModalPROP" style="text-decoration: none;">
        <div v-if="renderAllCircle">
          <client-only v-if="renderCircle">
            <p id="similarMini" class="has-text-weight-semibold">Similar</p>
            <div id="backGround"></div>
            <div id="value">{{ seriesRate }}%</div>
            <CircleProgress @hook:mounted="CircleProgressMounted" id="cpidMini" :value="seriesRate" :options="options"/>
          </client-only>
          <div id="rankCircleDiv" v-if="!renderCircle">
            <img src="/templates/rankCircle.svg" width="45" height="45" alt="">
            <span v-if="rankNumber < 10" class="rankCircleSpan is-size-5 is-size-6-mobile">#{{ rankNumber }}</span>
            <span v-else class="rankCircleSpan2 is-size-5 is-size-6-mobile">#{{ rankNumber }}</span>
          </div>
        </div>
        <div class="card-image">
          <figure class="image is-3by4">
            <picture>
              <source v-bind:srcset="`/img/` + seriesId + `.webp`" type="image/webp">
              <source v-bind:srcset="`/img/` + seriesId + `.jpg`" type="image/jpg">
              <img v-bind:src="`/img/` + seriesId + `.jpg`" alt="" @load="ImageLoadStatus"/>
            </picture>
          </figure>
        </div>
        <div class="imageTextArea has-text-centered">
          <div class="cardInfo">
            <p id="cardName" class="has-text-weight-semibold has-text-light is-size-7-mobile">{{ seriesName }}</p>
            <p id="cardHang" class="has-text-weight-normal has-text-light is-size-7 is-size-7-mobile">{{ seriesHang }}</p>
            <p id="cardYear" class="has-text-weight-semibold is-size-7-mobile">{{ seriesYear }}</p>
          </div>
        </div>
      </a>
    </div>
  </div>


</template>

<script>
export default {
  name: "CardV2",
  props: ["seriesName", "seriesHang", "seriesYear", "seriesRate", "seriesId", "showModalPROP", "aCardID", "renderCircle", "rankNumber", "renderAllCircle"],
  components: {
    CircleProgress: () => process.client ? import("vuejs-progress-bar") : null
  },
  methods: {


    CircleProgressMounted() {
      this.isCircleProgressMounted = true
      this.displayBind = "block"
    },

    ImageLoadStatus() {
      const path = window.location.pathname.split("/")[1]

      if (path !== "like") {
        this.isCircleProgressMounted = true
        this.displayBind = "block"
      }


    }

  },
  data() {
    return {
      isMobile: () => (window.innerWidth <= 768),
      isMobile2: false,
      skeletonWidth: "60px",
      skeletonHeigth: "60px",
      isCircleProgressMounted: false,
      isImageMounted: false,
      renderRate: false,
      renderRank: false,
      displayBind: "none",
      options: {
        text: {
          color: "#FFC107",
          shadowEnable: false,
          shadowColor: '',
          fontSize: 20,
          fontFamily: 'Ubuntu',
          hideText: true
        },
        progress: {

          color: '#C7042C',
          backgroundColor: 'white',
          inverted: false
        },
        layout: {
          height: 60,
          width: 60,
          verticalTextAlign: 31, //top
          horizontalTextAlign: 11, //left
          strokeWidth: 7,
          type: 'circle'
        }
      }
    }
  },
  beforeMount() {
    const path = window.location.pathname.split("/")[1]

    if (this.isMobile()) {
      this.options.layout.width = 45
      this.options.layout.height = 45
    }

  },


  mounted() {
    const path = window.location.pathname.split("/")[1]
    if (path === "like") {
      window.addEventListener("resize", e => {

        if (e.target.innerWidth < 768) {
          this.$children[0].$el.childNodes[1].width.baseVal.value = 45
          this.$children[0].$el.childNodes[1].height.baseVal.value = 45


        } else {
          this.$children[0].$el.childNodes[1].width.baseVal.value = 60
          this.$children[0].$el.childNodes[1].height.baseVal.value = 60
        }
      })
    }


  }

}
</script>

<style>

.card {
  box-shadow: unset;
}

#rankCircleDiv {
  position: absolute;
  z-index: 5;
  top: 5px;
  right: 5px;
  /*border: 1px solid cyan;*/
  width: 45px;
  height: 45px;
}


.rankCircleSpan {
  position: absolute;
  left: 11px;
  margin-top: 7px;
  color: #ffc107;
}

.rankCircleSpan2 {
  position: absolute;
  left: 6px;
  margin-top: 7px;
  color: #ffc107;
}

#cardHang{
  display: block;
}

@media only screen and (max-width: 768px) {

  #cardHang{
    display: none;
  }
  .cardInfo {
    line-height: 1rem;
  }

  #rankCircleDiv {
    width: 35px;
    /*height: 40px;*/

  }

  .rankCircleSpan {
    left: 9px;
    top: -2px;
  }

  .rankCircleSpan2 {
    left: 4px;
  }
}




/* */

</style>




