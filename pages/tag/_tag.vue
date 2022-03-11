<template>
  <div @click="CloseModalOutside">
    <div class="container">


      <div class="columns my-6 is-centered">
        <div class="column is-narrow">
          <div class="column is-narrow">
            <h1 v-if="takenData.length === 0" id="nores" class="is-size-4 has-text-dark ">No Result</h1>
            <h1 v-else id="koreanDramaAbout" class="is-size-4 is-size-5-mobile has-text-dark "
                style="text-align: center">Korean dramas about <span
              class="has-text-weight-semibold ">{{ tagsSSR }}</span></h1>
          </div>
        </div>
      </div>


      <div id="mainColumns" class="columns is-multiline is-centered is-mobile">

        <div class="column is-narrow" v-for="i in takenData.length">

          <card
            :render-ghost="false"
            :renderaAllCircle="false"
            :renderCircle="false"
            :id="`innerDiv`"
            :aCardID="i"
            :showModalPROP="showModal"
            :seriesName="takenData[i-1].name"
            :seriesHang="takenData[i-1].title"
            :seriesYear="takenData[i-1].year"
            :seriesRate="Math.round(100)"
            :seriesId="takenData[i-1].idx"
          />
        </div>
      </div>


      <Pagination :currentPageProp="this.page"
                   :totalPageProp="this.pageCount"
                   :tagsProp="this.tags"
      />

    </div>

    <modal
      v-bind:RenderCircleIfModalPROP="false"
      v-bind:valuePROP=0
      v-bind:modalInfoPROP="nameToModal"
      v-bind:modalYearPROP="yearToModal"
      v-bind:modalHangPROP="hangToModal"
      v-bind:modalSumTextPROP="sumToModal"
      v-bind:modalSumLinkPROP="sumLinkToModal"
      v-bind:modalVideoPROP="videoToModal"
      v-bind:modalImagePROP="idToModal"
      v-bind:modalSimilarNamePROP="similarNameToModal"
    />


  </div>
</template>


<script>
import axios from "axios";
import cardV2 from "@/components/Card";

export default {
  head() {
    return {
      title: `Korean dramas about ${this.tagsSSR}  - KDramaLike`,
      meta: [
        {
          name: "description",
          hid: "description",
          content: `Korean dramas about ${this.tagsSSR}`
        }
      ]
    }
  },
  layout: "custom",
  components: {
    cardV2,
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
    let tags = ctx.params.tag
    let page = ctx.query.p
    let tagsSSR = ctx.params.tag.split("--").map(e => e.replaceAll("_", " ")).join(", ")


    let res = await axios.get("http://localhost:3000/api/tagCalc?q=" + tags + "&page=" + page)
    // let res = await axios.get("https://kdramalike.com/api/tagCalc?q=" + tags + "&page=" + page)
      .catch(err => console.log("ERR :: " + err))
    let takenData = res.data
    // takenData[0] === 0 ? ctx.redirect("/404") : null
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


  mounted() {
  },
  methods: {
    CloseModalOutside(event) {
      if (event.target.className === "modal-background") {
        this.videoToModal = ""
        document.getElementById("modal1").classList.remove("is-active")
        document.getElementsByTagName("HTML")[0].classList.remove("is-clipped")
      }

    },

    showModal(e) {
      this.renderCircleIfModal = false
      let i = e.currentTarget.id
      let id = this.takenData[i - 1].idx
      let name = this.takenData[i - 1].name
      let year = this.takenData[i - 1].year
      let hang = this.takenData[i - 1].title
      let sum = this.takenData[i - 1].summary
      let sumLink = this.takenData[i - 1].summaryLink
      let video = this.takenData[i - 1].video
      let rate = this.takenData[i - 1].co

      this.rate = Math.round(rate * 100)
      this.nameToModal = name
      this.yearToModal = year
      this.hangToModal = hang
      this.sumToModal = sum
      this.sumLinkToModal = sumLink
      this.videoToModal = video
      // this.idToModal = `/img-webp/${id}.webp`
      this.idToModal = id
      this.similarNameToModal = this.nameSSR
      document.getElementById("modal1").classList.toggle("is-active")
      document.getElementsByTagName("HTML")[0].classList.toggle("is-clipped")
      document.getElementById("rateCol").style.display = "none"
    },

  }


}
</script>


<style>
#footerComp {
  position: relative !important;
}


#cardv2 {
  width: 183px;
  box-shadow: 0 7px 7px rgb(32 33 36 / 50%);;
  border: unset;
}

#mainColumns {
  min-height: calc(100vh - 530px);
}

.pagination {
  border-bottom: unset;
  background-color: unset;
}

.pagination-link.is-current {
  border-color: #1460d9;
  background-color: #1460d9;
}

.pagination-previous:focus {
  border-color: #363636;
}

.pagination-next:focus {
  border-color: #363636;
}

</style>
