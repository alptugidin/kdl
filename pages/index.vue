<template>
  <div class="index-div">
    <div class="container mx-auto">
      <div class="pt-10">
        <div class="text-center">
          <span class="ubuntu-font md:text-3xl text-xl font-semibold text-[#4A4A4A]">Latest Korean Dramas</span>
        </div>
        <div class="relative container mx-auto carousel">

          <chevron
              v-show="c1scroll > 1"
              id="c1"
              class="c1"
              @click.native="chevron"
              :direction="directionLeft"
              :rotate="rotateLeft"
          />

          <chevron
              v-show="c1scroll !== (c1max - current_width)"
              id="c2"
              class="c2"
              @click.native="chevron"
              :direction="directionRight" :rotate="rotateRight"
          />

          <div id="carousel1"
               class="container mx-auto carousel minh bg-[white] lg:rounded-xl rounded-[5px] outline outline-[1px] outline-[#dbdbdb] relative flex flex-nowrap lg:overflow-hidden overflow-auto">
            <card
                class="p-1"
                v-for="(series,index) in latestSeries"
                :render-rank="true"
                :id-prop="series.idx"
                :name-prop="series.name"
                :year-prop="series.year"
                :hang-prop="series.title"
                :rate-prop="series.rate"
                :rank-prop="index+1"
                :key="index"
            />
          </div>
        </div>
      </div>

      <div class="pt-10">
        <div class="text-center">
          <span class="ubuntu-font md:text-3xl text-xl font-semibold text-[#4A4A4A]">Most Popular Korean Dramas</span>
          <select @change="apiCall($event.target.value)"
                  class="year-selector outline-0 text-xl bg-[#F2F6FC] font-semibold text-[#4A4A4A] cursor-pointer hover:underline">
            <option v-for="year in years(2010,2021).reverse()" :value=year>{{ year }}</option>
          </select>
        </div>

        <div class="relative container mx-auto carousel">

          <chevron v-show="c2scroll > 1"
                   id="c3"
                   class="c3"
                   @click.native="chevron"
                   :direction="directionLeft"
                   :rotate="rotateLeft"
          />

          <chevron v-show="c2scroll !== (c2max - current_width2)"
                   id="c4"
                   class="c4"
                   @click.native="chevron"
                   :direction="directionRight"
                   :rotate="rotateRight"
          />

          <div id="carousel2"
               class="container mx-auto carousel minh bg-[white] lg:rounded-xl rounded-[5px] outline outline-[1px] outline-[#dbdbdb] relative flex flex-nowrap  lg:overflow-hidden overflow-auto">
            <card
                class="p-1"
                v-for="(series, index) in popularSeries"
                :render-rank="true"
                :id-prop="series.idx"
                :name-prop="series.name"
                :year-prop="series.year"
                :hang-prop="series.title"
                :rank-prop="index+1"
                :key="index"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios"

export default {
  layout: "custom",
  data() {
    return {
      years: (min, max) => [...Array(max - min + 1).keys()].map(i => i + min),
      state: false,
      rotateRight: "rotate(180, 19.5, 19.5)",
      rotateLeft: "",
      directionRight: "absolute z-[15] -right-[18px] top-[calc(50%_-_19px)]",
      directionLeft: "absolute z-[15] -left-[18px] top-[calc(50%_-_19px)]",
      latestSeries: [],
      popularSeries: [],
      c1scroll: 0,
      c2scroll: 0,
      current_width: 0,
      current_width2: 0,
      c1max: 0,
      c2max: 0
    }
  },
  methods: {

    apiCall(year) {


      axios.get(`/api/populars?q=${year}`)
          .catch(err => console.log(err))
          .then(res => {
            year.toString() === "2022" ? this.latestSeries = res.data : this.popularSeries = res.data
          })
          .finally(r => {
            this.c1max = document.getElementById("carousel1").scrollWidth
            this.c2max = document.getElementById("carousel2").scrollWidth
            year !== "2022" ? document.getElementById("carousel2").scroll({left: 0, behavior: "smooth"}) : null
          })
    },
    chevron(e) {
      const chevronClass = e.currentTarget.attributes[0].value
      const currentWidth = document.querySelector("#carousel1").offsetWidth
      const currentWidth2 = document.querySelector("#carousel2").offsetWidth
      const carousel1 = document.getElementById("carousel1")
      const carousel2 = document.getElementById("carousel2")


      if (chevronClass === "c1") {
        carousel1.scrollLeft -= currentWidth
        carousel1.addEventListener("scroll", () => {
          this.c1scroll = carousel1.scrollLeft
        })
      } else if (chevronClass === "c2") {
        // carousel1.scroll({left: carousel1.scrollLeft + currentWidth, behavior: "smooth"})
        carousel1.scrollLeft += currentWidth
        carousel1.addEventListener("scroll", () => {
          this.c1scroll = carousel1.scrollLeft
        })
      } else if (chevronClass === "c3") {
        carousel2.scrollLeft += currentWidth
        carousel2.addEventListener("scroll", () => {
          this.c2scroll = carousel2.scrollLeft
        })
      } else if (chevronClass === "c4") {
        carousel2.scrollLeft -= currentWidth
        carousel2.addEventListener("scroll", () => {
          this.c2scroll = carousel2.scrollLeft
        })
      }


    },


  },

  beforeMount() {
    this.apiCall(2022)
    this.apiCall(2021)

  },

  mounted() {
    this.current_width = document.getElementById("carousel1").scrollWidth
    this.current_width2 = document.getElementById("carousel2").scrollWidth


    const resizeObserver = new ResizeObserver(e => {
      this.current_width = e[0].contentRect.width
      this.c1max = document.getElementById("carousel1").scrollWidth
      this.c2max = document.getElementById("carousel2").scrollWidth
    })

    resizeObserver.observe(document.getElementById("carousel1"))

  },


}
</script>

