<template>
  <div @click="closeModalOutside">
    <div id="cont" class="container">

      <div class="columns">
        <div id="koreanDramasLikeCol" class="column mt-6 is-4-desktop is-offset-4-desktop is-10-mobile is-offset-1-mobile is-6-tablet is-offset-3-tablet">
          <div class="columns is-mobile">
            <div class="column is-narrow pr-0">
              <div style="overflow: hidden; border-radius: 12px; box-shadow: 0 7px 7px rgb(32 33 36 / 25%);;">
                <a @click="QueryModal(queryDataArray)">
                  <figure id="koreanDramasLikeFigure" class="image">
                    <picture>
                      <source v-bind:srcset="`/img/` + likeSSR + `.webp`" type="image/webp">
                      <source v-bind:srcset="`/img/` + likeSSR + `.jpg`" type="image/jpg">
                      <img id="queryImage" v-bind:src="`/img/` + likeSSR + `.jpg`" alt=""/>
                    </picture>
                  </figure>
                </a>
              </div>

            </div>
            <div class="column pr-0">
              <h1 id="koreanDramasLike" class="is-size-4 is-size-6-mobile">Korean Dramas Like<br><span
                class="has-text-weight-bold">{{ nameSSR }}</span></h1>
              <span v-if="hangSSR.length > 0" class="is-size-6 is-size-7-mobile">{{ hangSSR }}<br></span>
              <span>{{ yearSSR }}</span>
            </div>
          </div>
        </div>

      </div>


      <!--      <ghost-->
      <!--        :ghost-count="30"-->
      <!--        :is-active="isGhostActivePROP"-->
      <!--      />-->


      <div id="mainColumns" class="columns mt-5 is-multiline is-mobile is-centered">
        <div class="column is-narrow" v-for="(item, index) in this.data" v-if="index<limit">
          <CardV2
            :render-ghost="true"
            :render-all-circle="true"
            :renderCircle="true"
            :id="`innerDiv`"
            :aCardID="index"
            :showModalPROP="showModal"
            :seriesName="item[1]"
            :seriesHang="item[6]"
            :seriesYear="item[2]"
            :seriesRate="Math.round(item[0]*100)"
            :seriesId="item[7]"
          />
        </div>
        <div class=" is-12 column has-text-centered">
          <button v-bind:class="buttonClass" @click="More" style="border-radius: 10px">
            <img id="moreCustom" src="/templates/moreCustom.svg">
            &nbspMore
          </button>
        </div>
      </div>

      <Modal
        v-bind:valuePROP="rate"
        v-bind:modalInfoPROP="nameToModal"
        v-bind:modalYearPROP="yearToModal"
        v-bind:modalHangPROP="hangToModal"
        v-bind:modalSumTextPROP="sumToModal"
        v-bind:modalSumLinkPROP="sumLinkToModal"
        v-bind:modalVideoPROP="videoToModal"
        v-bind:modalImagePROP="idToModal"
        v-bind:modalSimilarNamePROP="similarNameToModal"
        :modal-common-tags-prop="commonTagsToModal"
      />
    </div>

  </div>
</template>

<script>


import CardV2 from "/components/CardV2"
import Modal from "/components/Modal"
import axios from "axios"

export default {
  head() {
    return {
      title: `Korean dramas like ${this.nameSSR} - KDramaLike`,
      meta: [
        {
          name: "description",
          hid: "description",
          content: `Korean dramas like ${this.nameSSR}; ` + this.nameMeta.join(", ")
        }
      ]
    }
  },
  layout: "custom",
  data() {
    return {
      rate: 0,
      isGhostActivePROP: true,
      renderCircleIfModal: null,
      nameToModal: null,
      yearToModal: null,
      hangToModal: null,
      sumToModal: null,
      sumLinkToModal: null,
      videoToModal: null,
      idToModal: "",
      similarNameToModal: null,
      commonTagsToModal: [],
      idSSR: null,
      limit: 30,
      count: 0,
      buttonClass: "button is-danger pr-2",
    }
  },

  async asyncData({route}) {
    //sayfa açılmadan önce burası çalışıyor

    let urlId, rawUrl, res, data, name, trueURL, userURL, dataPop
    let throwError = true
    if (route.params.seriesName.includes("--")) { //eğer url -- içeriyorsa
      userURL = route.params.seriesName.split("--")[0]//urlden name alınıyor
      urlId = route.params.seriesName.split("--")[1]//urlden id alınıyor
      rawUrl = "http://localhost:3000/api/calc?q=" + urlId // api ye gönderilen number parametresi
      // rawUrl = "https://kdramalike.com/api/calc?q=" + urlId // api ye gönderilen number parametresi
      res = await axios.get(rawUrl, {})
        .catch((err) => {
          console.log("axios Error => " + err);
        }) //sayfa yüklenirken api ye get requesti yapılıyor
      data = res.data //apiden gelen veri

      name = data[data.length - 1][0].name//name verisi en sondan alınıyor
      trueURL = name.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "-")
      const likeSSR = data[data.length - 1][0].idx
      const nameSSR = name
      const hangSSR = data[data.length - 1][0].title
      const yearSSR = data[data.length - 1][0].year
      const nameMeta = [data[0][1], data[1][1], data[2][1], data[3][1], data[4][1]]
      const queryDataArray = [...data[data.length - 1]][0]
      data.shift()
      data.pop()
      if (trueURL !== userURL) {// adres çubuğundaki url ile olması gereken url aynı değilse
        throwError = false
      }

      return {
        likeSSR,
        nameSSR,
        hangSSR,
        yearSSR,
        data,
        dataPop,
        nameMeta,
        throwError,
        queryDataArray
      }

    } else {//eğer url -- içermiyorsa
      throwError = false
      return throwError
    }

  },
  beforeMount() {
    if (!this.throwError) {
      window.location.href = "/"
    } else {
    }
  },

  mounted() {
    // console.log(document.getElementsByClassName("card").length)

  },

  components: {
    Modal, CardV2
  },
  methods: {
    More() {

      if (this.count === 0) {
        this.limit += 30
        this.count++
      } else if (this.count === 1) {
        this.limit += 30
        this.count++
      } else if (this.count === 2) {
        this.limit += 30
        this.buttonClass = "button is-static pr-2"
      }

    },
    showModal(e) {

      this.renderCircleIfModal = true
      let i = e.currentTarget.id
      let id = this.data[i][7]
      let name = this.data[i][1]
      let year = this.data[i][2]
      let hang = this.data[i][6]
      let sum = this.data[i][3]
      let sumLink = this.data[i][4]
      let video = this.data[i][5]
      let rate = this.data[i][0]
      let commonTags = this.data[i][8]

      this.rate = Math.round(rate * 100)
      this.nameToModal = name
      this.yearToModal = year
      this.hangToModal = hang
      this.sumToModal = sum
      this.sumLinkToModal = sumLink
      this.videoToModal = video
      this.idToModal = id
      this.similarNameToModal = this.nameSSR
      this.commonTagsToModal = commonTags
      document.getElementById("modal1").classList.toggle("is-active")
      document.getElementsByTagName("HTML")[0].classList.toggle("is-clipped")
      document.getElementById("rateCol").style.display = "block"
      document.getElementById("commonTagP").style.display = "block"
      document.getElementById("infoCol").style.textAlign = "left"
    },

    QueryModal(param) {

      this.renderCircleIfModal = false
      let id = param.idx
      let name = param.name
      let year = param.year
      let hang = param.title
      let sum = param.summary
      let sumLink = param.summaryLink
      let video = param.video


      this.nameToModal = name
      this.yearToModal = year
      this.hangToModal = hang
      this.sumToModal = sum
      this.sumLinkToModal = sumLink
      this.videoToModal = video
      this.idToModal = id

      document.getElementById("commonTagP").style.display = "none"
      document.getElementById("rateCol").style.display = "none"
      document.getElementById("modal1").classList.toggle("is-active")
      document.getElementsByTagName("HTML")[0].classList.toggle("is-clipped")
      // document.getElementById("infoCol").style.textAlign = "center"
    },

    closeModalOutside(event) {
      if (event.target.className === "modal-background") {
        this.videoToModal = ""
        document.getElementById("modal1").classList.remove("is-active")
        document.getElementsByTagName("HTML")[0].classList.remove("is-clipped")
      }
    },


  },

}
</script>
<style>
#footerComp {
  /*position: relative !important;*/
  /*z-index: 20;*/
}


#cont {
  /*display: none;*/

}

#cardv2 {
  width: 183px !important;
  box-shadow: 0 7px 7px rgb(32 33 36 / 50%);;
  border: unset;
}

@media only screen and (max-width: 768px) {
  #cardv2{
    width: 105px !important;
  }

  #queryImage{
    width: 105px !important;
    height: 140px !important;
  }
}

#queryImageDiv {
  /*margin-left: calc(100% - 120px );*/
  /*padding-right: 18px;*/
}

#queryImage {
  /*border-radius: 12px;*/
  width: 120px;
  /*height: 169px ;*/
  transition: transform .4s;

}

#queryImage:hover {
  transform: scale(1.1);
}


#koreanDramasLikeCol {
  border-radius: 12px;
  background-color: white;
  border: 1px solid #dbdbdb;

}




</style>
