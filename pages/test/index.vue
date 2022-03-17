<template>


  <div>
    <p>master</p>
    <!--    <div class="bg-white absolute top-0 w-full border-b border-db">-->
    <!--      <div class="container flex flex-wrap items-center lg:h-74px h-24 ">-->
    <!--        <div class="lg:basis-1/3 basis-full">-->
    <!--          <img src="/templates/bannerV3x64.png" alt="" class="w-1/3 lg:w-auto ml-[33%] lg:ml-0">-->
    <!--        </div>-->
    <!--        <div class="lg:basis-1/3 basis-11/12">-->
    <!--          <form>-->
    <!--            <input class="focus:outline-none bg-ef w-full h-36px pl-9 rounded-xl ml-[4.1666665%] lg:ml-0"/>-->
    <!--            <img src="/templates/searchCustom.svg" class="absolute top-2 left-2 w-5 ml-[4.1666665%] lg:ml-0">-->
    <!--          </form>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->


    <div class="container grid gap-6 md:gap-6 place-items-center" style="margin-top: 50px">

      <div class="cc" style="outline: 1px solid red" v-for="i in 1">
      </div>

    </div>


  </div>
</template>

<script>
export default {
  methods: {
    bannerClick() {
      window.location.href = "/test"
    }
  }
}
</script>

<style>
.bg-white {
  background-color: white !important;
}

.cc {
  width: 183px;
  height: 244px;
  background-color: pink;
  border-radius: 12px;
}
</style>
