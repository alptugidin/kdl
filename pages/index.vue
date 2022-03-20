<template>
  <div>
    <div class="container mx-auto py-10">
      <div class="text-center">
        <span id="c1text" class="d:text-3xl t:text-3xl text-xl font-semibold text-[#4A4A4A]">Latest Korean Dramas</span>
      </div>

      <div class="mx-auto carousel1 bg-[white] rounded-[3px] outline outline-[1px] outline-[#dbdbdb] relative flex flex-nowrap py-2 overflow-hidden">
        <div class="px-1" v-for="i in 16">
          <card/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  layout: "custom",
}
</script>

<style>

#c1text {
  font-family: "Ubuntu", serif;
}


</style>