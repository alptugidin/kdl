<template>
  <div>
    <nav :class="'bg-white border-b border-[#DBDBDB] w-full' + (this.flag ? ' minimised icy' : ' not-minimised')">
      <div
          :class="'container mx-auto grid d:grid-cols-3 t:grid-cols-4 grid-cols-1 items-center' + (flag ? ' md:h-[55px] h-[50px]':' md:h-[74px] h-[90px]')">
        <div class="d:w-auto t:w-3/4 w-1/4 d:ml-0 t:ml-0 ml-[37.5%] grid grid-col-1 items-center">
          <img @click="goHome" src="/templates/bannerV3x64.png" alt=""
               :class="'cursor-pointer' + (flag ? ' hidden' : '')">
        </div>
        <div :class="'t:col-start-2 t:col-span-2 px-1.5 d:px-0 t:px-0' + (flag ? ' mb-[5px] md:mb-[0]' : '')">
          <search-box :flag-prop="flag"/>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
export default {
  methods: {
    goHome() {
      window.location.href = "/"
    }
  },
  data() {
    return {
      flag: false
    }
  },

  mounted() {
    window.addEventListener("scroll", e => {
      this.flag = window.scrollY > 75
    })
  },


}
</script>


<style>

.bg-white {
  background-color: white;
}


</style>