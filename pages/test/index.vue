<template>
  <div>
    <nav class=" border-b border-[#dbdbdb]">
      <div class="container grid d:grid-cols-4 t:grid-cols-4  grid-cols-1 d:h-[74px] t:h-[74px] h-[120px] items-center">
        <div class="d:w-auto t:w-[90%] w-1/3 justify-self-center d:justify-self-auto">
          <img src="/templates/bannerV3x64.png" alt="" class="">
        </div>
        <div class="justify-self-center d:col-span-2 t:col-span-2 d:w-[64%] t:w-full w-11/12">
          <form action="">
            <input class="border-xl bg-[#efefef] outline-none rounded-xl h-[36px] w-full">
          </form>
        </div>
      </div>
    </nav>


    <div class="container bg-[white] mt-[30px] flex flex-wrap gap-10 place-content-center">
      <div id="test-card" v-for="i in 36"></div>
    </div>


  </div>

</template>


<script>
export default {

}
</script>


<style>
/*searchbox 432px -- 33% */
nav {
  background-color: white;
}

body {
  padding-top: 0;
}

#test-card {
  width: 183px;
  background-color: pink;
  height: 244px;
  border-radius: 12px;
  border: 1px solid red;
}


/*

mobile: up to 768px
tablet: from 769px
desktop: from 1024px
widescreen: from 1216px
fullhd: from 1408px

*/


</style>