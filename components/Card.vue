<template>
  <div>

    <div id="fakeCard" v-if="!isReady">
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
        <svg v-if="renderRateProp" id="svgProgress" height="60" width="60" viewBox="0 0 100 100">
          <circle
              cx="50"
              cy="50"
              :r="this.r"
              stroke="white"
              stroke-width="6"
              fill-opacity="0.7"
              :stroke-dasharray="2*Math.PI*this.r"
              :stroke-dashoffset="0"
              transform="rotate(-90 50 50)"/>
          <circle
              cx="50"
              cy="50"
              :r="this.r"
              stroke="#C71B2B"
              fill="transparent"
              stroke-width="6"
              :stroke-dasharray="2*Math.PI*this.r"
              :stroke-dashoffset="2*Math.PI*this.r - (2*Math.PI*this.r*(seriesRate/100))"
              transform="rotate(-90 50 50)"/>
          <text text-anchor="middle" x="50%" y="45%" fill="#ffc107" font-size="30px">{{ seriesRate }}%</text>
          <text text-anchor="middle" x="50%" y="70%" fill="#ffc107" font-size="23px">Similar</text>
        </svg>

        <div id="rankCircleDiv" v-if="renderRankProp">
          <img src="/templates/rankCircle.svg" width="45" height="45" alt="">
          <span v-if="rankNumber < 10" class="rankCircleSpan is-size-5 is-size-6-mobile">#{{ rankNumber }}</span>
          <span v-else class="rankCircleSpan2 is-size-5 is-size-6-mobile">#{{ rankNumber }}</span>
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
            <p id="cardHang" class="has-text-weight-normal has-text-light is-size-7 is-size-7-mobile">{{
                seriesHang
              }}</p>
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
  props: [
    "seriesName",
    "seriesHang",
    "seriesYear",
    "seriesRate",
    "seriesId",
    "showModalPROP",
    "aCardID",
    "renderCircle",
    "rankNumber",
    "renderAllCircle",
    "renderRateProp",
    "renderRankProp"
  ],

  methods: {


    ImageLoadStatus() {

      this.isReady = true
      this.displayBind = "block"
    }


  },


  data() {
    return {
      isReady: false,
      r: 45,
      rate: null,
      skeletonWidth: "60px",
      skeletonHeigth: "60px",
      isCircleProgressMounted: true,//false
      isImageMounted: false,
      renderRate: false,
      renderRank: false,
      displayBind: "none ", //none

    }
  },


}
</script>

<style>

#cardv2 {
  width: 182px;
  overflow: hidden;
  border-radius: 8px;
  display: none;
  /*outline: 1px solid #dbdbdb;*/
}


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

#cardHang {
  display: block;
}

#svgProgress {
  position: absolute;
  z-index: 5;
  right: 8px;
  top: 8px;

}

@media only screen and (max-width: 768px) {

  #svgProgress {
    width: 40px;
    height: 40px;
    right: 4px;
    top: 4px;
  }


  #cardHang {
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




