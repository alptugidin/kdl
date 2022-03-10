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
            <p id="commonTagP" v-if="renderCommonTags">Common tags: <span v-html="ColoredTags(modalCommonTagsProp)"></span> </p>
          </div>
          <div id="rateCol" class="column" :style="{display:rateColDisplayState}">
            <div class="columns mb-0">
              <div class="column is-7 is-offset-4">
                <client-only>
                  <div id="rateDiv">
                    <circleProgress
                      id="cpid"
                      :value="valuePROP"
                      :options="options"
                      style="margin-top: -25%"
                    />
                  </div>
                </client-only>
              </div>
            </div>
            <div class="columns has-text-centered" style="margin-top: -20px">
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
    "modalCommonTagsProp"
  ],
  components: {
    circleProgress: () => process.client ? import("vuejs-progress-bar") : null
  },
  methods: {
    CloseModal() {
      this.modalVideoPROP = null
      document.getElementById("modal1").classList.remove("is-active")
      document.getElementsByTagName("HTML")[0].classList.remove("is-clipped")
    },

    ColoredTags(param){
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

    const isMobile = () => (window.innerWidth <= 768)
    if (isMobile()) {
      const path = this.options
      path.layout.height = 70
      path.layout.width = 70
      path.layout.horizontalTextAlign = 15
      path.layout.verticalTextAlign = 47
      path.text.fontSize = 20
    }
  },

  data() {
    return {

      isMobile: () => (window.innerWidth <= 768),
      rateColDisplayState: "block",
      textAlign: "left",
      renderCommonTags: false,
      value: 50,
      randomColor: ["is-primary", "is-link", "is-info", "is-success", "is-warning", "is-danger"],
      options: {
        text: {
          color: "#B30934",
          shadowEnable: false,
          shadowColor: '',
          fontSize: 35,
          fontFamily: 'Ubuntu',
          hideText: false
        },
        progress: {
          color: '#B30934',
          backgroundColor: '#8d8a8a',
          inverted: false
        },
        layout: {
          height: 120,
          width: 120,
          verticalTextAlign: 75,
          horizontalTextAlign: 25,
          strokeWidth: 6,
          type: 'circle'
        }
      }
    }
  }

}
</script>


<style>

.tag{
  border: 1px solid #dbdbdb;
  height: unset !important;
}

#commonTagP{
  display: block;
}

@media only screen and (max-width: 768px) {
  .modal-card{
    width: 95%;
  }
  #modSumCol{
    padding-right: 0.75rem !important;
  }
  #infoCol{
    /*text-align: center;*/
  }
}

@media only screen and (max-width: 1023px) {
  .modal-card{
    width: 95%;
  }
}

</style>
