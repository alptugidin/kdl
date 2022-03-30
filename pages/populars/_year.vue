<template>
  <div>
    <div class="container mx-auto pb-20">
      <div class="text-center py-10">
        <h1 class="md:text-2xl text-xl text-[#4A4A4A] ubuntu-font font-normal">Most popular Korean Dramas in <span
            class="font-semibold">{{ yearSSR }}</span></h1>
      </div>

      <div class="flex flex-wrap justify-center lg:gap-14 gap-8">
        <card
            @click.native="showModal"
            v-for="(series,index) in takenData"
            :id-prop="series.idx"
            :name-prop="series.name"
            :year-prop="series.year"
            :hang-prop="series.title"
            :rank-prop="index+1"
            :key="index"
            :number-prop="index"
        />
      </div>
    </div>
    <modal
        :series-name-prop="nameToModal"
        :series-year-prop="yearToModal"
        :series-hang-prop="hangToModal"
        :summary-prop="sumToModal"
        :summary-link-prop="sumLinkToModal"
        :id-prop="idToModal"
        :video-prop="videoToModal"
    />
  </div>
</template>


<script>

import axios from "axios";

export default {

  layout: "custom",

  head() {
    return {
      title: `Most popular Korean Dramas in ${this.yearSSR} - KDramaLike`,
      meta: [
        {
          name: "description",
          hid: "description",
          content: `Most popular Korean Dramas in ${this.yearSSR} - KDramaLike`,
        }
      ]
    }
  },

  data() {
    return {
      nameToModal: "",
      yearToModal: "",
      hangToModal: "",
      sumToModal: "",
      sumLinkToModal: "",
      videoToModal: "",
      idToModal: "",
      similarNameToModal: "",
    }

  },


  async asyncData(ctx) {
    //Most-popular-Korean-Dramas-

    // ctx.params.year.substring(0, ctx.params.year.length - 4) !== "Most-popular-Korean-Dramas-" ? ctx.redirect("/404") : null
    const yearSSR = ctx.params.year.split("-").at(-1)
    const rawData = await axios.get(`${process.env.NUXT_ENV_CURRENT_API}populars?q=${yearSSR}`)
        .catch(err => {
          console.log("ERROR IN _YEAR :: " + err)
        })

    let takenData
    try {
      // takenData = rawData.data[0].data
      takenData = rawData.data
    } catch (e) {
      // ctx.redirect("/404")
      console.log("_year" + e)
    }

    return {
      yearSSR,
      takenData
    }

  },

  methods: {
    showModal(e) {
      const i = e.currentTarget.id
      this.nameToModal = this.takenData[i].name
      this.yearToModal = this.takenData[i].year
      this.hangToModal = this.takenData[i].title
      this.sumToModal = this.takenData[i].summary
      this.sumLinkToModal = this.takenData[i].summaryLink
      this.idToModal = this.takenData[i].idx
      this.videoToModal = this.takenData[i].video
      document.body.classList.add("clipped")
      document.getElementById("custom-modal").style.display = "block"
    },


  }


}
</script>


<style>

#footerComp {
  position: relative !important;
}

#mainColumns {
  padding-bottom: 180px;
  margin-bottom: 0;
}

#cardv2 {
  width: 183px;
  box-shadow: 0 7px 7px rgb(32 33 36 / 50%);;
  border: unset;
}


</style>
