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

      <div class="custom-modal-body grid md:grid-cols-2 grid-cols-1  overflow-auto">
        <div class="text-sm md:min-h-[250px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, odio, voluptatibus? Assumenda blanditiis
          consequatur consequuntur delectus, deleniti distinctio ea eveniet ex fugit hic in non numquam quae quam quia,
          quidem rem, vel voluptates? Consequatur consequuntur cum debitis dicta dolore excepturi expedita fuga ipsum
          iure magni minus, neque nostrum omnis pariatur placeat quaerat quis quo repellendus repudiandae suscipit
          tempore vel voluptas voluptates. Adipisci at blanditiis corporis deserunt eius facilis ipsam iste mollitia
          neque nobis obcaecati, officiis quidem reiciendis saepe totam! Eveniet molestiae nemo provident quam repellat,
          similique suscipit tenetur totam voluptate? Asperiores dolorem dolores earum eum magni maxime modi molestiae
          nisi non rerum? Animi beatae commodi consequuntur corporis cum cupiditate deleniti dolores doloribus dolorum,
          eaque eligendi et eveniet ipsum, iste minima nam nemo nihil nobis nulla odio perferendis placeat quam quasi
          qui quia quidem repellendus saepe sed, similique sit suscipit tempora totam ullam vel veniam voluptatem
          voluptates. Aliquam aspernatur dolorem, facere incidunt ipsam ipsum magni obcaecati rerum sit sunt?
          Accusantium ad adipisci amet asperiores assumenda at atque aut consequatur consequuntur culpa dignissimos
          dolore error ex ipsa itaque laboriosam magni, maxime minima molestias nesciunt nisi nostrum officiis omnis
          perferendis perspiciatis provident quidem quo quos reiciendis reprehenderit repudiandae sapiente sit, tempora
          tempore temporibus velit vero. Aliquam, architecto cupiditate dolorem, ea eligendi expedita harum, impedit
          modi obcaecati quae voluptates voluptatum? Architecto commodi consectetur cupiditate iusto magnam neque omnis
          quis tenetur. Deleniti error nemo voluptatibus. Aliquam at facere labore laborum molestias perspiciatis
          ratione rem, saepe suscipit voluptatem. Deleniti nam nemo nobis placeat! Animi, distinctio enim?
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
  },

}
</script>

<style>
/*103 145*/
html {
  overflow: hidden;
}
</style>


