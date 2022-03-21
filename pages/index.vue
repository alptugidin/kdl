<template>
  <div class="index-div">
    <div class="container mx-auto">

      <div class="pt-10">
        <div class="text-center">
          <span class="ubuntu-font md:text-3xl text-xl font-semibold text-[#4A4A4A]">Latest Korean Dramas</span>
        </div>

        <div class="relative container mx-auto carousel">
          <chevron :direction="directionLeft" :rotate="rotateLeft"/>
          <chevron :direction="directionRight" :rotate="rotateRight"/>
          <div
              class="container mx-auto carousel lg:min-h-[261px] bg-[white] rounded-xl outline outline-[1px] outline-[#dbdbdb] relative flex flex-nowrap lg:overflow-hidden overflow-auto">
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
          <chevron :direction="directionLeft" :rotate="rotateLeft"/>
          <chevron :direction="directionRight" :rotate="rotateRight"/>
          <div
              class="container mx-auto carousel bg-[white] rounded-xl outline outline-[1px] outline-[#dbdbdb] relative flex flex-nowrap  lg:overflow-hidden overflow-auto">
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
                @hook:mounted="componentLoaded"
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
      state: false,
      rotateRight: "rotate(180, 19.5, 19.5)",
      rotateLeft: "",
      directionRight: "absolute z-[15] -right-[18px] top-[calc(50%_-_18px)]",
      directionLeft: "absolute z-[15] -left-[18px] top-[calc(50%_-_18px)]",
      years: (min, max) => [...Array(max - min + 1).keys()].map(i => i + min),
      latestSeries: [],
      popularSeries: [],
      isComponentLoaded: false
    }
  },
  methods: {
    componentLoaded(){
      this.isComponentLoaded = true
      console.log(this.isComponentLoaded)
    },
    apiCall(year) {

      axios.get(`/api/populars?q=${year}`)
          .catch(err => console.log(err))
          .then(res => {
            year.toString() === "2022" ? this.latestSeries = res.data : this.popularSeries = res.data
          })
    }
  },

  mounted() {
    this.apiCall(2022)
    this.apiCall(2021)
  }

}
</script>

<style>

.ubuntu-font {
  font-family: "Ubuntu", serif;
}


</style>