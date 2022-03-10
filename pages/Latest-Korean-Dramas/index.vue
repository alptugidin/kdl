<template>
  <div @click="closeModalOutside">
    <div class="container">

      <div class="columns my-6 is-centered">
        <div class="column is-narrow">
          <div class="column is-narrow" style="text-align: center">
            <h1 id="koreanDramaAbout" class="is-size-4 has-text-dark ">Latest Korean Dramas</h1>
          </div>
        </div>
      </div>

      <div id="mainColumns" class="columns is-multiline is-centered is-mobile">

        <div class="column is-narrow" v-for="i in takenData.length">

          <cardV2
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
  </div>
</template>


<script>
import axios from "axios";

export default {

  layout: "custom",

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
    const rawData = await axios.get(`http://localhost:3000/api/populars?q=2022`)
    // const rawData = await axios.get(`https://kdramalike.com/api/populars?q=2022`)
      .catch(err => {
        console.log("ERROR IN _YEAR :: " + err)
      })
    // const takenData = rawData.data[0].data
    const takenData = rawData.data
    return {
      takenData
    }

  },

  methods:{
    showModal(e){
      this.renderCircleIfModal = false
      let i = e.currentTarget.id
      let id = this.takenData[i-1].idx
      let name = this.takenData[i-1].name
      let year = this.takenData[i-1].year
      let hang = this.takenData[i-1].title
      let sum = this.takenData[i-1].summary
      let sumLink = this.takenData[i-1].summaryLink
      let video = this.takenData[i-1].video
      let rate = this.takenData[i-1].co

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

    closeModalOutside(event) {
      if (event.target.className === "modal-background") {
        this.videoToModal = ""
        document.getElementById("modal1").classList.remove("is-active")
        document.getElementsByTagName("HTML")[0].classList.remove("is-clipped")
      }
    },

  }

}
</script>


<style>
#footerComp{
  position: relative !important;
}

#mainColumns{
  margin-bottom: 180px;
}

#cardv2 {
  width: 183px ;
  box-shadow: 0 7px 7px rgb(32 33 36 / 50%);;
  border: unset;
}

</style>
