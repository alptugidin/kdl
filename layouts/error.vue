<template>
  <div>
    <headerComp/>
        <div class="container mx-auto">
          <p class="text-center ubuntu-font text-[#C7042C] text-8xl mt-40">{{error.statusCode}}</p>
          <p class="text-center ubuntu-font text-[#4a4a4a] text-3xl ">{{error.message}} <span class="text-3xl">&#128553;</span> </p>
        </div>
    <footerComp style="position:fixed; bottom: 0; width: 100%"/>
  </div>
</template>


<script>
import headerComp from "/components/Header"
import footerComp from "/components/Footer"


export default {
  props: ['error'],

  components: {
    headerComp,
    footerComp
  },

};

</script>
<style>

</style>
