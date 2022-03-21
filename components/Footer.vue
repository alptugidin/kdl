<template>
  <div>
    <nav class="relative w-full bg-[#404040]">
      <div class="container p-1 mx-auto grid d:grid-cols-4 t:grid-cols-3 grid-cols-1">
        <div class="items-center d:mb-0 t:mb-0 mb-8">
          <div class="d:text-left t:text-left text-center">
            <a href="/"><span id="footer-home" class="d:text-3xl t:text-4xl text-2xl text-[#f5f5f5] font-semibold">KDramaLike</span></a>
            <span class="text-[#b5b5b5] font-semibold">2022</span>
          </div>
          <div class="d:text-left t:text-left text-center">
            <a href="/#"><span class="text-[#ffc107] font-bold">/</span> <span
                class="text-[white] hover:underline decoration-[#ffc107] decoration-2">About</span></a>
            <a href="/#"><span class="text-[#ffc107] font-bold">/</span> <span
                class="text-[white] hover:underline decoration-[#ffc107] decoration-2">Privacy</span></a>
            <a href="/#"><span class="text-[#ffc107] font-bold">/</span> <span
                class="text-[white] hover:underline decoration-[#ffc107] decoration-2">Terms</span></a>
          </div>
        </div>
        <div class="d:col-start-4 d:col-end-4 t:col-start-3 t:col-end-3">
          <div class="grid grid-cols-1 items-center">
            <div class="text-center d:px-0 t:px-0 px-20">
              <span class="text-[17px] text-[#dbdbdb]">Most Popular Korean Dramas</span><br>
              <div v-for="i in years(2010,2021).reverse()" class="inline-block">
                <a :href="'/populars/Most-popular-Korean-Dramas-'+i">
                  <span class="text-[white] hover:underline decoration-[#ffc107] decoration-2">{{ i }}</span>
                </a>
                <span class="text-[#ffc107] font-bold">/&nbsp</span><br>

              </div>
              <br>

              <a href="Latest-Korean-Dramas"><span
                  class="text-[white] hover:underline decoration-[#ffc107] decoration-2">Latest Korean Dramas</span></a>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      years: (min, max) => [...Array(max - min + 1).keys()].map(i => i + min),
    }
  }
}
</script>


<style>

#footer-home {
  font-family: "Ubuntu", serif;

}

.dd {
  color: #ffc107;
}

</style>