<template>
  <div>
    <div class="absolute left-0 top-0 bg-[black] opacity-70 h-full w-full z-20">
    </div>
    <div class="custom-modal">
      <div class="flex  p-3 bg-[#EFEFEF] rounded-t-xl border-b border-[#dbdbdb]">
        <div class="basis-1/6 pr-3">
          <div>
            <img src="/img/576266.webp" alt="" class="rounded-xl">
          </div>
        </div>
        <div class="basis-3/6 px-2">
          <div class="text-[#4a4a4a]">
            <p class="md:text-2xl text-xl font-semibold ubuntu-font ">Korean Drama</p>
            <p class="text-sm">갯마을 차차차</p>
            <p class="text-lg font-semibold">2022</p>
            <div>
              <span>Common tags:</span>
            </div>
          </div>
        </div>
        <div class="basis-2/6 text-center">
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
            <span class="font-semibold">Sample Korean Drama</span>
          </div>
        </div>
      </div>
      <div class="flex p-2">
        <div class="basis-1/2 text-sm">
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi, consequatur deleniti dolore eaque enim esse eum excepturi facilis fugiat harum impedit, incidunt maiores minus neque odio porro praesentium quae quaerat quas quasi quod quos rem reprehenderit sunt temporibus unde ut, vitae voluptates voluptatum? Corporis cum hic officiis recusandae unde.
          </span>
        </div>
        <div class="basis-1/2">
          <iframe src="https://www.youtube.com/embed/Udjfqst67_k" class=" w-[391px] h-[210px] md:rounded-br-xl"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Modal2",
  data() {
    return {
      rateProp: 50
    }
  }
}
</script>

<style scoped>

</style>