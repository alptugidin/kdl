<template>
  <div>
    <div class="container mx-auto">
      <div class="flex justify-center ">
        <div
            class="lg:basis-1/3 md:basis-7/12 basis-11/12  bg-[white] lg:rounded-xl rounded-[5px] border border-[#dbdbdb] p-2 mt-10">
          <div class="grid grid-cols-3">
            <div>
              <div class="overflow-hidden rounded-xl w-fit">
                <img :src="'/img/' + likeSSR + '.webp'" width="120" alt="query-image"
                     class="lg:rounded-xl rounded-[5px] border border-[#dbdbdb] hover:scale-[1.1] cursor-pointer card-image">
              </div>
            </div>
            <div class="col-span-2">
              <div class="ubuntu-font md:pl-0 pl-1">
                <p class="text-2xl">Korean Dramas like</p>
                <p class="text-2xl font-bold">{{ nameSSR }}</p>
                <p class="text-sm">{{ hangSSR }}</p>
                <p class="text-sm">{{ yearSSR }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap justify-center lg:gap-14 gap-8 mt-10">
        <card
            v-for="(series,index) in takenData.slice(firstPos,lastPos)"
            :render-rate="true"
            :id-prop="series[7]"
            :name-prop="series[1]"
            :year-prop="series[2]"
            :hang-prop="series[6]"
            :rate-prop="Math.round(series[0]*100)"
            :rank-prop="index+1"
            :key="index"
        />

      </div>
      <div class="flex flex-row justify-center py-28">
        <div class="bg-[#EFEFEF] border border-[#DBDBDB] rounded-full w-[108px]">
          <div class="flex flex-row text-center leading-9">
            <div @click="pagination" v-for="i in 3" :class="parseInt(i) === 1 ? bindPagClass : defPagClass"><span>{{ i }}</span>
            </div>
          </div>
        </div>
      </div>


    </div>


  </div>
</template>


<script>
import axios from "axios";

export default {
  layout: "custom",
  data() {
    return {
      firstPos: 0,
      lastPos: 30,
      defPagClass: "basis-1/3 h-[36px] custom-pagination",
      bindPagClass: "basis-1/3 h-[36px] custom-pagination current-page"
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
      const nameMeta = [takenData[0][1], takenData[1][1], takenData[2][1], takenData[3][1], takenData[4][1]]
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
        this.firstPos = 0
        this.lastPos = 30
      } else if (num === "2") {
        this.firstPos = 30
        this.lastPos = 60
      } else {
        this.firstPos = 60
        this.lastPos = 90
      }

      window.scroll({top: 0, behavior: "smooth"})

    }
  }
}

</script>

<style>

.query-image {
  transform: scale(1.1);
}

</style>