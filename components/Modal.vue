<template>
  <div id="modal1" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section id="modalHead" class="py-3 px-3">
        <div class="columns is-mobile ">
          <div id="imageCol" class="column is-narrow">
            <div class="card-image">
              <figure class="image">
                <!--                <img id="modalImg" v-bind:src="modalImagePROP"/>-->
                <picture>
                  <source v-bind:srcset="`/img/` + modalImagePROP + `.webp`" type="image/webp">
                  <source v-bind:srcset="`/img/` + modalImagePROP + `.jpg`" type="image/jpg">
                  <img id="modalImg" v-bind:src="`/img/` + modalImagePROP + `.jpg`" alt=""/>
                </picture>
              </figure>
            </div>
          </div>
          <div id="infoCol" class="column" :style="{textAlign:this.textAlign}">
            <p
                id="modalInfo"
                class="has-text-weight-semibold is-size-4 is-size-5-mobile"
            >{{ modalInfoPROP }}</p>
            <p id="modalHang">{{ modalHangPROP }}</p>
            <p id="modalYear" class="is-size-5">{{ modalYearPROP }}</p>
            <p id="commonTagP" v-if="renderCommonTags">Common tags: <span
                v-html="ColoredTags(modalCommonTagsProp)"></span></p>
          </div>
          <div id="rateCol" class="column" :style="{display:rateColDisplayState}">
            <div class="columns mb-0">
              <div class="column is-7 is-offset-4" >

                <svg v-if="renderRateProp" id="svgProgressModal" height="90" width="90" viewBox="0 0 100 100">
                  <circle
                      cx="50"
                      cy="50"
                      :r="rProp"
                      stroke="#dbdbdb"
                      stroke-width="6"
                      fill-opacity="0.7"
                      :stroke-dasharray="2*Math.PI*rProp"
                      :stroke-dashoffset="0"
                      transform="rotate(-90 50 50)"/>
                  <circle
                      cx="50"
                      cy="50"
                      :r="rProp"
                      stroke="#C71B2B"
                      fill="transparent"
                      stroke-width="6"
                      :stroke-dasharray="2*Math.PI*rProp"
                      :stroke-dashoffset="2*Math.PI*rProp - (2*Math.PI*rProp*(valuePROP/100))"
                      transform="rotate(-90 50 50)"/>
                  <text text-anchor="middle" x="50%" y="60%" fill="#ffc107" font-size="30px">{{ valuePROP }}%</text>
                </svg>


              </div>
            </div>
            <!--            <div class="columns has-text-centered" style="margin-top: -20px">-->
            <div class="columns has-text-centered">
              <div id="rateCol2" class="column is-9 is-offset-3 py-0 px-0">
                <p>Similar to</p>
                <p
                    id="similarName"
                    class="has-text-weight-semibold is-size-6-mobile"
                >{{ modalSimilarNamePROP }}</p>
              </div>
            </div>
          </div>


        </div>
      </section>
      <section class="modal-card-body px-3 pt-3">
        <div class="columns">
          <div id="modSumCol" class="column pr-0">
            <p id="sumText">
              {{ modalSumTextPROP }}
              <a id="readMore" v-bind:href="modalSumLinkPROP" target="_blank" rel="noopener noreferrer">Read More</a>
            </p>
          </div>
          <div class="column">
            <figure class="image is-16by9">
              <iframe
                  id="frame"
                  class="has-ratio"
                  width="640"
                  height="360"
                  v-bind:src="modalVideoPROP"
                  frameborder="0"
                  allowfullscreen
              ></iframe>
            </figure>
          </div>
        </div>
      </section>
      <div id="modalFoot">
        <div class="columns is-mobile is-centered">
          <div id="closeButtonCol" class="column is-narrow my-2" style="margin-left: 0 !important;">
            <button id="closeButton" class="button is-danger is-small" @click="CloseModal">Close</button>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="CloseModal"></button>
    </div>
  </div>
</template>


<script>
export default {
  name: "Modal",

  props: [
    "modalImagePROP",
    "modalInfoPROP",
    "modalYearPROP",
    "modalHangPROP",
    "valuePROP",
    "modalVideoPROP",
    "modalSumLinkPROP",
    "modalSumTextPROP",
    "modalSimilarNamePROP",
    "modalCommonTagsProp",
    "renderRateProp",
    "rProp"
  ],
  methods: {
    CloseModal() {
      this.modalVideoPROP = null
      document.getElementById("modal1").classList.remove("is-active")
      document.getElementsByTagName("HTML")[0].classList.remove("is-clipped")
    },

    ColoredTags(param) {
      let coloredTagsArray = []

      param.forEach(tag => {
        let randomColor = this.randomColor[Math.floor(Math.random() * this.randomColor.length)]
        const coloredTag = `<span class="tag is-light ${randomColor}">${tag}</span>`
        coloredTagsArray.push(coloredTag)
      })
      return coloredTagsArray.join(" ")
    }
  },

  //mobil için progress ayarları
  mounted() {

    const path = window.location.pathname.split("/")[1]
    path !== "like" ? this.rateColDisplayState = "none" : null
    // path !== "like" ? this.textAlign = "center" : null
    path === "like" ? this.renderCommonTags = true : null

  },

  data() {
    return {
      isMobile: () => (window.innerWidth <= 768),
      rateColDisplayState: "block",
      textAlign: "left",
      renderCommonTags: false,
      value: 50,
      randomColor: ["is-primary", "is-link", "is-info", "is-success", "is-warning", "is-danger"],
    }
  }

}
</script>


<style>

.tag {
  border: 1px solid #dbdbdb;
  height: unset !important;
}

#commonTagP {
  display: block;
}

#svgProgressModal {
  margin-left: calc(calc(100% - 90px)/2);
}

@media only screen and (max-width: 768px) {
  .modal-card {
    width: 95%;
  }

  #svgProgressModal{
    width: 60px;
    height: 60px;
  }

  #svgProgressModal {
    margin-left: calc(calc(100% - 60px)/2);
  }
  #modSumCol {
    padding-right: 0.75rem !important;
  }


  #infoCol {
    /*text-align: center;*/
  }
}

@media only screen and (max-width: 1023px) {
  .modal-card {
    width: 95%;
  }
}

</style>
