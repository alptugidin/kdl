<template>
  <div @click="closeModalOutside">
    <div class="container">
      <div class="columns is-vcentered is-centered mt-5 ">
        <div class="column is-narrow">
          <h1 style="text-align: center" id="newKoreanDramas"
              class="has-text-weight-semibold is-size-3 is-size-5-mobile">
            Latest Korean Dramas
          </h1>
        </div>
      </div>
      <!--      <button @click="TEST" class="mb-5" >TEST</button>-->

      <div id="carousel1" class="columns is-multilane is-vcentered is-mobile">
        <div v-bind:id="`col1Card${i - 1}`" v-for="i in newDramas.length"
             class="column is-narrow" style="padding-left: 5px; padding-right: 5px;">

          <card
            :id="`innerDiv`"
            :showModalPROP="showModal"
            :aCardID="i-1"
            :seriesName="newDramas[i-1].name"
            :seriesHang="newDramas[i-1].title"
            :seriesYear="newDramas[i-1].year"
            :seriesRate="Math.round(newDramas[i-1].co * 100)"
            :seriesId="newDramas[i-1].idx"
            :rankNumber="i"
            :render-rank-prop="true"
          />


        </div>

        <a v-show="isMobile" id="toLeftA" class="button chevron left" @click="Chevron">
          <img id="toLeftSVG2" src="/templates/toLeft.svg" alt="">
        </a>
        <a v-show="isMobile" id="toRightA" class="button chevron right" @click="Chevron">
          <img id="toRightSVG2" src="/templates/toRight.svg" alt="">
        </a>

      </div>

      <div class="columns is-vcentered is-centered mt-5 ">
        <div class="column is-narrow">
          <h1 id="mostPopularKoreanDramas" style="text-align: center"
              class="has-text-weight-semibold is-size-3 is-size-5-mobile">
            Most popular Korean Dramas
            <select @change="ChangeYear" id="yearSelector" class="has-text-dark has-text-weight-semibold" style="background-color: #F2F6FC; border: 1px solid #F2F6FC">
              <option v-for="year in years(2010,2021).reverse()">{{ year }}</option>
            </select>
          </h1>
        </div>
      </div>
      <div id="carousel2" class="columns is-vcentered is-mobile">
        <div v-bind:id="`col1Card${i-1}`" v-for="i in popDramas.length"
             class="column is-narrow" style="padding-left: 5px; padding-right: 5px;">

          <card
            :id="`innerDiv`"
            :showModalPROP="showModal"
            :aCardID="i-1"
            :seriesName="popDramas[i-1].name"
            :seriesHang="popDramas[i-1].title"
            :seriesYear="popDramas[i-1].year"
            :seriesRate="Math.round(popDramas[i-1].co * 100)"
            :seriesId="popDramas[i-1].idx"
            :rankNumber="i"
            :render-rank-prop="true"
          />
        </div>

        <a v-show="isMobile" id="toLeftA2" class="button chevron left2" @click="Chevron">
          <img id="toLeftSVG" src="/templates/toLeft.svg" alt="">
        </a>
        <a v-show="isMobile" id="toRightA2" class="button chevron right2" @click="Chevron">
          <img id="toRightSVG" src="/templates/toRight.svg" alt="">
        </a>
      </div>

      <modal
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
import modal from "/components/Modal"
// import headerComp from "/components/HeaderV2"
// import footerComp from "/components/Footer"
import axios from "axios"

export default {
  layout: "custom",
  name: "index",
  components: {
    modal
  },
  data() {
    return {
      // isMobile: () => window.innerWidth <= 800,
      isMobile: true,
      j: 0,
      r: "R",
      l: "L",
      chevronStartNumber: 0,
      popDramas: [],
      newDramas: [],
      carouselWidth: [],
      LChevronGroup: [],
      RChevronGroup: [],
      nameToModal: "",
      yearToModal: "",
      hangToModal: "",
      sumToModal: "",
      sumLinkToModal: "",
      videoToModal: "",
      idToModal: "",
      similarNameToModal: "",
      randomSeries: "",
      randomTag: "",

      years: (min, max) => [...Array(max - min + 1).keys()].map(i => i + min),
    }
  },

  beforeMount() {
    if (window.screen.width < 768) {
      this.isMobile = false
    }
  },
  mounted() {


    this.Call(2021)
    this.NewDramas(2022)
    this.LChevronGroup = [document.getElementById("toLeftA"), document.getElementById("toLeftA2")]
    this.RChevronGroup = [document.getElementById("toRightA"), document.getElementById("toRightA2")]
  },
  methods: {
    TEST() {

      console.log(this.newDramas.length)
    },


    ChangeYear(e) {
      this.Call(e.currentTarget.value)
      document.getElementById("carousel2").scrollLeft = 0
    },
    NewDramas(year) {
      axios.get(`/api/populars?q=${year}`)
        .catch((err) => {
          console.log(" call function >>  " + err)
        })
        .then((res) => {
          // this.newDramas = res.data[0].data
          this.newDramas = res.data
          //find random series name in newdramas

        })
    },
    Call(year) {
      axios.get(`/api/populars?q=${year}`)
        .catch((err) => {
          console.log(" call function >>  " + err)
        })
        .then((res) => {
          // this.popDramas = res.data[0].data
          this.popDramas = res.data
          // this.randomSeries = this.popDramas[Math.floor(Math.random() * this.popDramas.length)]
          // this.randomTag = this.randomSeries.tags[Math.floor(Math.random() * this.randomSeries.tags.length)]
          // this.randomTag = "random tag"
          // document.getElementById("inputId").placeholder = "e.g. " + this.randomSeries.name

        })
    },
    showModal(e) {

      if (document.getElementById("carousel1").contains(e.currentTarget)) {
        this.nameToModal = this.newDramas[e.currentTarget.id].name
        this.yearToModal = this.newDramas[e.currentTarget.id].year
        this.hangToModal = this.newDramas[e.currentTarget.id].title
        this.sumToModal = this.newDramas[e.currentTarget.id].summary
        this.sumLinkToModal = this.newDramas[e.currentTarget.id].summaryLink
        this.videoToModal = this.newDramas[e.currentTarget.id].video
        this.idToModal = this.newDramas[e.currentTarget.id].idx
        this.similarNameToModal = this.newDramas[e.currentTarget.id].similarName
        document.getElementById("modal1").classList.toggle("is-active")
        document.getElementsByTagName("HTML")[0].classList.toggle("is-clipped")
        document.getElementById("rateCol").style.display = "none"
      } else if (document.getElementById("carousel2").contains(e.currentTarget)) {
        this.nameToModal = this.popDramas[e.currentTarget.id].name
        this.yearToModal = this.popDramas[e.currentTarget.id].year
        this.hangToModal = this.popDramas[e.currentTarget.id].title
        this.sumToModal = this.popDramas[e.currentTarget.id].summary
        this.sumLinkToModal = this.popDramas[e.currentTarget.id].summaryLink
        this.videoToModal = this.popDramas[e.currentTarget.id].video
        this.idToModal = this.popDramas[e.currentTarget.id].idx
        this.similarNameToModal = this.popDramas[e.currentTarget.id].similarName
        document.getElementById("modal1").classList.toggle("is-active")
        document.getElementsByTagName("HTML")[0].classList.toggle("is-clipped")
        document.getElementById("rateCol").style.display = "none"
      }
    },


    closeModalOutside(event) {
      if (event.target.className === "modal-background") {
        this.videoToModal = ""
        document.getElementById("modal1").classList.remove("is-active")
        document.getElementsByTagName("HTML")[0].classList.remove("is-clipped")
      }
    },

    Chevron(e) {
      const component = e.currentTarget
      const direction = e.currentTarget.classList[2]
      const carousel = e.currentTarget.parentNode
      const cardCount = e.currentTarget.id === "toRightA" || e.currentTarget.id === "toLeftA" ? this.newDramas.length : 30
      const totalWidth = (cardCount * 192) - carousel.offsetWidth
      direction === "right" || direction === "right2" ? carousel.scrollLeft += carousel.offsetWidth : carousel.scrollLeft -= carousel.offsetWidth
      setTimeout(() => {
        if (carousel.scrollLeft === totalWidth) { //eğer tam sağ ise sağ kapanıyor değilse açık kalıyor
          component.style.display = "none"
        } else {
          if (component.id[component.id.length - 1] === "2") {
            const found = this.RChevronGroup.find(e => e.id[e.id.length - 1] === "2")
            found.style.display = "block"
          } else {
            const found = this.RChevronGroup.find(e => e.id[e.id.length - 1] !== "2")
            found.style.display = "block"
          }
        }
        if (carousel.scrollLeft === 0) { //eğer tam sol ise sol kapanıyor değilse açık kalıyor
          if (component.id[component.id.length - 1] === "2") {
            const found = this.LChevronGroup.find(e => e.id[e.id.length - 1] === "2")
            found.style.display = "none"
          } else {
            const found = this.LChevronGroup.find(e => e.id[e.id.length - 1] !== "2")
            found.style.display = "none"
          }
        } else {
          if (component.id[component.id.length - 1] === "2") {
            const found = this.LChevronGroup.find(e => e.id[e.id.length - 1] === "2")
            found.style.display = "block"
          } else {
            const found = this.LChevronGroup.find(e => e.id[e.id.length - 1] !== "2")
            found.style.display = "block"
          }
        }
      }, 650)
    },
  }


}
</script>

<style scoped>

#carousel2, #carousel1 {
  /*width: 1344px;*/
  width: 100%;
  border-radius: 2px;
  outline: 1px solid #dbdbdb;
  background-color: white;
  height: 252px;
  overflow: hidden;
  scroll-behavior: smooth;
  /*box-shadow: 0 1px 6px rgb(32 33 36 / 28%);*/
}


#toLeftSVG, #toRightSVG, #toLeftSVG2, #toRightSVG2 {
  width: 40%;
  margin-top: 30%;
}


#toRightA2, #toRightA {
  position: absolute;
  /*opacity: 1;*/
  display: block;
  right: -21px;
  z-index: 5;
  /*opacity: .5;*/
  /*transition: all .3s;*/
  width: 42px;
  height: 42px;
  border-radius: 999rem;
  transition: 0.2s;
  padding: 0 !important;
}


#toLeftA2, #toLeftA {
  position: absolute;
  /*opacity: 0;*/
  display: none;
  left: -21px;
  z-index: 5;
  /*opacity: .5;*/
  /*transition: all .3s;*/
  width: 42px;
  height: 42px;
  border-radius: 999rem;
  transition: 0.2s;
  padding: 0 !important;;
}

#toLeftA2:hover, #toLeftA:hover, #toRightA2:hover, #toRightA:hover {
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);

}

.columns {;
  margin-left: 0 !important;

}

.toLeft {
  position: absolute;
  left: 192px;
  visibility: hidden;

}


select {
  /*font-size: 1rem;*/
  border-radius: 5px;
  color: #666666;
  border: 1px solid #d1d1d9;
}

select:focus {
  outline: none;
}

#mostPopularKoreanDramas, #newKoreanDramas {
  font-family: "Ubuntu", serif;
}


select {
  border-radius: 0;
  border-top: 1px solid #FAFAFA;
  border-left: unset;
  border-right: unset;
  border-bottom: 1px solid #FAFAFA;
  background-color: #FAFAFA;
  padding: 0;
  transition: .3s all;
  font-size: 1.3rem;
  text-decoration: underline rgba(255, 255, 255, 0);
}

select:hover {
  text-decoration: underline;
  text-decoration-color: #4A4A4A;
}

#carousel2 {
  margin-bottom: 164px;
}

@media only screen and (max-width: 768px) {
  #carousel1, #carousel2 {
    /*display: none;*/
    overflow-x: hidden;
    height: 200px;
  }

}

@media only screen and (max-width: 1023px) {
  #carousel1, #carousel2 {
    overflow-x: auto;
  }

}


</style>
