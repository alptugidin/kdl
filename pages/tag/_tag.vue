<template>
  <div>
    <div class="container mx-auto">
      <div class="text-center py-10">
        <h1 class="md:text-2xl text-xl text-[#4A4A4A] ubuntu-font">Korean Dramas about <span
            class="font-semibold">{{ tagsSSR }}</span></h1>
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
      <pagination
          :current-page-prop="this.page"
          :total-page-prop="this.pageCount"
          :tags-prop="this.tags"
      />
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
  async asyncData(ctx) {
    let tags = ctx.params.tag
    let page = ctx.query.p
    let tagsSSR = ctx.params.tag.split("--").map(e => e.replaceAll("_", " ")).join(", ")
    let res = await axios.get(process.env.NUXT_ENV_CURRENT_API + "tagCalc?q=" + tags + "&page=" + page)
        .catch(err => console.log("ERR :: " + err))
    let takenData = res.data
    let pageCount = Math.ceil((takenData.at(-1) / 60))
    takenData.pop()
    return {
      tagsSSR,
      pageCount,
      takenData,
      page,
      tags
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

      document.getElementById("custom-modal").style.display = "block"

    }
  }
}
</script>
