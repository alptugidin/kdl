<template>
  <div :id="numberProp">
    <div v-show="!isImageLoaded"
         class="lg:w-[180px] lg:h-[253px] w-[103px] h-[145px] bg-[#dbdbdb] lg:rounded-xl rounded-[5px] relative">
      <div class="animate-pulse">
        <div class="lg:w-[60px] lg:h-[60px] w-[45px] h-[45px] bg-[#fafafa] absolute top-1 right-1 rounded-full"></div>
        <div class="w-full h-[60px] rounded-b-xl absolute bottom-0 grid grid-rows-3 place-items-center">
          <div class="w-3/4 h-[14px] bg-[#FAFAFA] rounded-[5px]"></div>
          <div class="w-2/4 h-[14px] bg-[#FAFAFA] rounded-[5px]"></div>
          <div class="w-1/3 h-[14px] bg-[#FAFAFA] rounded-[5px]"></div>
        </div>
      </div>
    </div>
    <div v-show="isImageLoaded"
         class="custom-card cursor-pointer lg:w-[180px] w-[103px] outline outline-[1px] outline-[#dbdbdb] lg:rounded-xl rounded-[5px] relative overflow-hidden">
      <div v-if="renderRank" class="absolute top-1 right-1 z-10 lg:w-[60px] w-[45px]">
        <img src="/templates/rankCircle.svg" alt="rankCircleSvg" class="w-full h-full">
        <div class="absolute md:w-full w-full text-center lg:top-3 top-2.5">
          <span class="text-[#ffc107] lg:text-2xl text-[18px]">#{{ rankProp }}</span></div>
      </div>

      <div v-if="renderRate" class="absolute top-1 right-1 z-10 ">

        <svg id="svgProgress" height="0" width="0" viewBox="0 0 100 100"
             class="lg:w-[60px] lg:h-[60px] w-[45px] h-[45px]">
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
              :stroke-dashoffset="2*Math.PI*40 - (2*Math.PI*45*(rateProp/100))"
              transform="rotate(-90 50 50)"/>
          <text text-anchor="middle" x="50%" y="45%" fill="#ffc107" font-size="30px">{{ rateProp }}%</text>
          <text text-anchor="middle" x="50%" y="70%" fill="#ffc107" font-size="23px">Similar</text>
        </svg>
      </div>

      <img @load="imageLoadStatus" :src="'/img/' + idProp + '.webp'"
           class="card-image object-fill w-full lg:rounded-xl rounded-[5px] lg:w-[180px] lg:h-[253px] w-[103px] h-[145px]"
           alt="">
      <div class="absolute bottom-0 z-10 text-center text-[red] w-full lg:text-sm text-[0.75rem]">
        <p class="font-semibold text-[#f5f5f5]">{{ nameProp }}</p>
        <p class="text-[#f5f5f5] lg:block hidden">{{ hangProp }}</p>
        <p class="font-semibold text-[#ffc107]">{{ yearProp }}</p>
      </div>
      <div class="bg-gradient-to-t from-[black] w-full h-1/2 absolute bottom-0 lg:rounded-b-xl rounded-b-[5px]"></div>
    </div>
  </div>
</template>


<script>
export default {
  props: [
    "renderRate",
    "renderRank",
    "idProp",
    "nameProp",
    "yearProp",
    "hangProp",
    "rateProp",
    "rankProp",
    "numberProp"
  ],
  data() {
    return {
      isImageLoaded: false

    }
  },
  methods: {
    imageLoadStatus() {
      this.isImageLoaded = true
    },
  }
}
</script>

<style>
/*103 138*/

.custom-card:hover .card-image {
  transform: scale(1.1);

}
</style>