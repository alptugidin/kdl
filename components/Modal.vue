<template>
  <div id="custom-modal" class="hidden" @click="closeModalOutside">
    <div id="modal-background" class="fixed left-0 top-0 bottom-0 bg-[black] opacity-70  w-full h-full z-20">
    </div>
    <div id="alp" class="fixed md:top-20 top-0 bottom-0 right-0 left-0 z-20">
      <div class="custom-modal">
        <div class="flex p-2 bg-[#EFEFEF] rounded-t-xl border-b border-[#dbdbdb]">
          <div class="md:basis-1/6 basis-0 md:pr-3 pr-0">
            <div>
              <img :src="'/img/' + idProp +'.webp'" alt="" class="rounded-xl">
            </div>
          </div>
          <div class="basis-3/6 md:px-2 px-1">
            <div class="text-[#4a4a4a]">
              <p class="md:text-2xl text-xl font-semibold ubuntu-font ">{{ seriesNameProp }}</p>
              <p class="text-sm">{{ seriesHangProp }}</p>
              <p class="text-lg font-semibold">{{ seriesYearProp }}</p>
              <div v-if="renderCommonProp">
                <span>Common tags:</span>

                <div class="tag2 t1">
                  <span class="p-1">Romance</span>
                </div>
                <div class="tag2 t2">
                  <span class="p-1">Family</span>
                </div>
                <div class="tag2 t3">
                  <span class="p-1">Drama</span>
                </div>
                <div class="tag2 t4">
                  <span class="p-1">Older Woman Younger Man</span>
                </div>
                <div class="tag2 t5">
                  <span class="p-1">Romance</span>
                </div>

              </div>
            </div>
          </div>
          <div v-if="renderSvgProp" class="md:basis-2/6 basis-3/6 text-center">
            <svg id="svgProgress" height="0" width="0" viewBox="0 0 100 100"
                 class="md:w-[80px] md:h-[80px] w-[50px] h-[50px] md:ml-[calc(calc(100%_-_80px)/2)] ml-[calc(calc(100%_-_50px)/2)]">
              <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#dbdbdb"
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
              <text text-anchor="middle" x="50%" y="60%" fill="#ffc107" font-size="30px">{{ rateProp }}%</text>
            </svg>
            <div class="text-[#4a4a4a]">
              <span>Similar to</span><br>
              <span class="font-semibold">{{ similarNameProp }}</span>
            </div>
          </div>
        </div>

        <div class="flex md:flex-row flex-col p-2">
          <div class="md:basis-1/2 basis-full text-sm">
            <div class="">
              {{ summaryProp }}
              <a :href="summaryLinkProp" class="font-semibold hover:underline">Read More</a>
            </div>

          </div>
          <div class="md:basis-1/2 basis-full">
            <iframe :src="videoProp" class="w-full aspect-video"/>
          </div>
          <div class="mt-2 md:hidden block">
            <button class="bg-[#C7042C] p-1 rounded-[5px]  text-[white] px-4 ml-[calc(calc(100%_-_70px)/2)]">
              Close
            </button>
          </div>
        </div>


      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Modal2",
  props: [
    "seriesNameProp",
    "seriesHangProp",
    "seriesYearProp",
    "summaryProp",
    "summaryLinkProp",
    "similarNameProp",
    "rateProp",
    "renderCommonProp",
    "renderSvgProp",
    "videoProp",
    "idProp"
  ],

  methods: {
    closeModalOutside(e) {
      if (e.target.id === "modal-background" || e.target.id === "alp") {
        document.querySelector("#custom-modal").style.display = "none"
        this.videoProp = "";
      }
    }
  }
}
</script>

<style scoped>

</style>