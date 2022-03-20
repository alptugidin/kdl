<template>
  <div>
    <div v-show="state" class="w-[180px] h-[240px] bg-[#dbdbdb] rounded-xl relative">
      <div class="animate-pulse">
        <div class="w-[54px] h-[54px] bg-[#fafafa] absolute top-2 right-2 rounded-full"></div>
        <div class="w-full h-[72px] rounded-b-xl absolute bottom-0 grid grid-rows-3 place-items-center">
          <div class="w-3/4 h-[16px] bg-[#FAFAFA] rounded-[5px]"></div>
          <div class="w-2/4 h-[16px] bg-[#FAFAFA] rounded-[5px]"></div>
          <div class="w-1/3 h-[16px] bg-[#FAFAFA] rounded-[5px]"></div>
        </div>
      </div>
    </div>
    <div v-show="!state"
         class="custom-card w-[180px] h-[240px] outline outline-[1px] outline-[#dbdbdb] rounded-xl relative overflow-hidden">
      <div class=" absolute right-2 top-2 visible text-center z-10">
        <img src="/templates/rankCircle.svg" alt="rankCircleSvg">
        <span class="text-[#ffc107] absolute right-0 left-0 top-[10px] text-2xl">#1</span>
      </div>
      <svg id="svgProgress" height="60" width="60" viewBox="0 0 100 100" class="absolute right-2 top-2 hidden">
        <circle
            cx="50"
            cy="50"
            r="45"
            stroke="white"
            stroke-width="6"
            fill-opacity="0.7"
            :stroke-dasharray="2*Math.PI*45"
            :stroke-dashoffset="0"
            transform="rotate(-90 50 50)"/>
        <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#C71B2B"
            fill="transparent"
            stroke-width="6"
            :stroke-dasharray="2*Math.PI*40"
            :stroke-dashoffset="2*Math.PI*40 - (2*Math.PI*45*(seriesRate/100))"
            transform="rotate(-90 50 50)"/>
        <text text-anchor="middle" x="50%" y="45%" fill="#ffc107" font-size="30px">{{ seriesRate }}%</text>
        <text text-anchor="middle" x="50%" y="70%" fill="#ffc107" font-size="23px">Similar</text>
      </svg>
      <img src="/img/153.webp" class="card-image object-fill w-full h-full rounded-xl" alt="">
      <div class="absolute bottom-0 z-10 text-center text-[red] w-full">
        <p class="font-semibold text-[#f5f5f5]">Sample Korean Drama</p>
        <p class="text-[#f5f5f5]">스물다섯 스물하나</p>
        <p class="font-semibold text-[#ffc107]">2021</p>
      </div>
      <div class="bg-gradient-to-t from-[black] w-full h-1/2 absolute bottom-0 rounded-b-xl"></div>
    </div>
    <!--    <button @click="TEST">Click</button>-->
  </div>
</template>


<script>
export default {
  props: ["renderRateProp", "renderRankProp"],
  data() {
    return {
      seriesRate: 50,
      state: false
    }
  },
  methods: {
    TEST() {
      this.state = !this.state
    }
  }
}
</script>

<style>
.card-image {
  transition: transform .4s;
}

.custom-card:hover .card-image {
  transform: scale(1.1);
}
</style>