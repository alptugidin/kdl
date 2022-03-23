<template>
  <div>
    <div class="absolute left-0 top-0 bg-[black] opacity-70 h-full w-full z-20">
    </div>
    <div class="custom-modal">
      <div class="custom-modal-head">
        <div class="grid md:grid-cols-6 grid-cols-3">
          <div class="md:block hidden">
            <div class="rounded-xl w-[120px] h-[169px]">
              <img src="/img/576266.webp" alt="" class="rounded-xl">
            </div>
          </div>
          <div class="md:col-start-2 md:col-span-3 col-start-1 col-span-2">
            <div class="text-[#4a4a4a]">
              <p class="md:text-2xl text-xl font-semibold ubuntu-font ">Korean Drama</p>
              <p class="text-sm">갯마을 차차차</p>
              <p class="text-lg font-semibold">2022</p>
            </div>
            <div class="grid grid-cols-1">
              <div>
                <span class="md:text-lg text-sm text-[#4a4a4a]">Common tags: </span>
                <div class="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, repudiandae.
                </div>
              </div>
            </div>
          </div>
          <div class="md:col-start-5 md:col-span-2 col-start-3 col-end-3 place-self-center text-center">
            <div class="w-full">
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
            </div>
            <div class="text-[#4a4a4a]">
              <span>Similar to</span><br>
              <span class="font-semibold">Sample Korean Drama</span>
            </div>

          </div>
        </div>
      </div>
      <div class="custom-modal-body grid md:grid-cols-2 grid-cols-1">
        <div class="text-sm md:min-h-[250px] overflow-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci corporis dolore, earum enim est hic
          incidunt ipsa laborum magni, mollitia numquam provident quidem quod ratione voluptas. Explicabo facere itaque
          laboriosam tempore. A aliquid aperiam cumque cupiditate debitis dolores eligendi error esse hic illum ipsa
          laudantium molestiae molestias nemo non odio officiis placeat quasi quidem quis reiciendis sequi soluta, ut
          vel voluptas voluptates voluptatibus. Accusamus animi atque, distinctio excepturi in labore nemo odit
          officiis, porro praesentium sapiente sint sunt. Architecto asperiores, blanditiis culpa dicta, distinctio est
          fugit ipsa ipsum molestiae nulla porro quibusdam quod sed suscipit temporibus tenetur, unde vel voluptates!
        </div>
        <div class="min-h-[250px]">
          <iframe src="https://www.youtube.com/embed/Udjfqst67_k" class="w-full h-full md:rounded-br-xl"/>
        </div>
      </div>
      <button
          class="md:hidden w-[80px] bg-[#C7042C] mb-1 text-[#FAFAFA] py-1 px-2 rounded-[5px] ml-[calc(calc(100%_-_80px)/2)]">
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rateProp: 50
    }
  }
}
</script>

<style>
/*103 145*/
html {
  overflow: hidden;
}
</style>


