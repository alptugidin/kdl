<template>
  <div>
    <div class="container mx-auto">
      <div class="flex justify-center ">
        <div
            class="lg:basis-1/3 md:basis-7/12 basis-11/12  bg-[white] lg:rounded-xl rounded-[5px] border border-[#dbdbdb] p-2 mt-10">
          <div class="grid grid-cols-3">
            <div>
              <div class="overflow-hidden rounded-xl w-fit">
                <img @click="showModal" id="query-card"
                     :src="'/img/' + likeSSR + '.webp'" width="120" alt="query-image"
                     class="lg:rounded-xl rounded-[5px] border border-[#dbdbdb] hover:scale-[1.1] cursor-pointer card-image">
              </div>
            </div>
            <div class="col-span-2">
              <div class="ubuntu-font md:pl-0 pl-1">
                <h1 class="inline-block">
                  <span class="text-2xl">Korean Dramas like</span><br>
                  <span class="text-2xl font-bold">{{ nameSSR }}</span><br>
                </h1>
                <p class="text-sm">{{ hangSSR }}</p>
                <p class="text-sm">{{ yearSSR }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap justify-center lg:gap-14 gap-8 mt-10">
        <card
            @click.native="showModal"
            v-for="(series,index) in takenData.slice(firstPos,lastPos)"
            :render-rate="true"
            :id-prop="series[7]"
            :name-prop="series[1]"
            :year-prop="series[2]"
            :hang-prop="series[6]"
            :rate-prop="Math.round(series[0]*100)"
            :rank-prop="index+1"
            :key="index"
            :number-prop="index + numberToCard"
        />

      </div>
      <div class="flex flex-row justify-center py-28">
        <div class="bg-[#EFEFEF] border border-[#DBDBDB] rounded-full w-[108px]">
          <div class="flex flex-row text-center leading-9">
            <div @click="pagination" v-for="i in 3" :class="parseInt(i) === 1 ? bindPagClass : defPagClass">
              <span>{{ i }}</span>
            </div>
          </div>
        </div>
      </div>


    </div>

    <modal
        :series-name-prop="nameToModal"
        :series-year-prop="yearToModal"
        :series-hang-prop="hangToModal"
        :summary-prop="sumToModal"
        :summary-link-prop="sumLinkToModal"
        :video-prop="videoToModal"
        :id-prop="idToModal"
        :similar-name-prop="similarNameToModal"
        :rate-prop="Math.round(rateToModal*100)"
        :render-common-prop="renderCommonTags"
        :common-tags-prop="commonTagsToModal"
        :render-svg-prop="renderSvg"
    />

  </div>
</template>


<script>
import axios from "axios";

export default {
  layout: "custom",
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

  data() {
    return {
      firstPos: 0,
      lastPos: 30,
      defPagClass: "basis-1/3 h-[36px] custom-pagination",
      bindPagClass: "basis-1/3 h-[36px] custom-pagination current-page",
      nameToModal: "",
      yearToModal: "",
      hangToModal: "",
      sumToModal: "",
      sumLinkToModal: "",
      videoToModal: "",
      idToModal: "",
      similarNameToModal: "",
      commonTagsToModal: [],
      rateToModal: 0,
      currentPage: 1,
      numberToCard: 0,
      renderSvg: true,
      renderCommonTags: true
    }
  },
  async asyncData({route}) {

    let urlId, rawUrl, res, takenData, name, trueURL, userURL, dataPop
    let throwError = true
    if (route.params.like.includes("--")) { //eğer url -- içeriyorsa
      userURL = route.params.like.split("--")[0]//urlden name alınıyor
      urlId = route.params.like.split("--")[1]//urlden id alınıyor
      rawUrl = process.env.NUXT_ENV_CURRENT_API + "calc?q=" + urlId // api ye gönderilen number parametresi
      res = await axios.get(rawUrl, {})
          .catch((err) => {
            console.log("axios Error => " + err);
          }) //sayfa yüklenirken api ye get requesti yapılıyor
      takenData = res.data //apiden gelen veri
      name = takenData[takenData.length - 1][0].name//name verisi en sondan alınıyor
      trueURL = name.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "-")
      const likeSSR = takenData[takenData.length - 1][0].idx
      const nameSSR = name
      const hangSSR = takenData[takenData.length - 1][0].title
      const yearSSR = takenData[takenData.length - 1][0].year
      const nameMeta = [takenData[1][1], takenData[2][1], takenData[3][1], takenData[4][1], takenData[5][1]]
      const queryDataArray = [...takenData[takenData.length - 1]][0]
      takenData.shift()
      takenData.pop()
      if (trueURL !== userURL) {// adres çubuğundaki url ile olması gereken url aynı değilse
        throwError = false
      }
      return {
        likeSSR,
        nameSSR,
        hangSSR,
        yearSSR,
        takenData,
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

  methods: {
    pagination(e) {
      const num = e.path[0].textContent
      document.querySelectorAll(".custom-pagination").forEach(element => {
        if (element.textContent === num) {
          element.classList.add("current-page")
        } else {
          element.classList.remove("current-page")
        }
      })
      if (num === "1") {
        this.currentPage = 1
        this.firstPos = 0
        this.lastPos = 30
        this.numberToCard = 0
      } else if (num === "2") {
        this.currentPage = 2
        this.firstPos = 30
        this.lastPos = 60
        this.numberToCard = 30
      } else {
        this.currentPage = 3
        this.firstPos = 60
        this.lastPos = 90
        this.numberToCard = 60
      }

      window.scroll({top: 0, behavior: "smooth"})

    },

    showModal(e) {

      if (e.target.id === "query-card") {
        this.nameToModal = this.queryDataArray.name
        this.yearToModal = this.queryDataArray.year
        this.hangToModal = this.queryDataArray.title
        this.sumToModal = this.queryDataArray.summary
        this.sumLinkToModal = this.queryDataArray.summary_link
        this.videoToModal = this.queryDataArray.video
        this.idToModal = this.queryDataArray.idx
        this.renderSvg = false
        this.renderCommonTags = false
        document.querySelector("#custom-modal").style.display = "block"
      } else {
        this.rateToModal = this.takenData[e.currentTarget.id][0]
        this.nameToModal = this.takenData[e.currentTarget.id][1]
        this.yearToModal = this.takenData[e.currentTarget.id][2]
        this.hangToModal = this.takenData[e.currentTarget.id][6]
        this.sumToModal = this.takenData[e.currentTarget.id][3]
        this.sumLinkToModal = this.takenData[e.currentTarget.id][4]
        this.videoToModal = this.takenData[e.currentTarget.id][5]
        this.idToModal = this.takenData[e.currentTarget.id][7]
        this.similarNameToModal = this.nameSSR
        this.commonTagsToModal = this.takenData[e.currentTarget.id][8]
        this.renderSvg = true
        this.renderCommonTags = true
        document.querySelector("#custom-modal").style.display = "block"
      }


    }
  }
}

</script>

<style>

.query-image {
  transform: scale(1.1);
}

</style>