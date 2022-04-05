<template>
  <div>
    <div
        class="wl fixed w-[70px] h-[396px] bg-[white] rounded-t-lg bottom-0 right-5 z-20 custom-shadow mb-[-360px] transition-all">
      <div @click="showList"
           class="flex wl-head absolute top-0 h-[36px] w-full bg-[white] rounded-t-lg  cursor-pointer leading-[36px]">
        <div class="wl-left w-1/2 h-[36px]">
          <img src="/templates/fav.svg" alt="" class="wl-left-image mt-[8px] ml-[8px]">
        </div>
        <div class="wl-right w-1/2 text-center">
          <span id="wl-text" class="font-semibold ubuntu-font text-[#C71B2B] text-[20px]">2</span>
        </div>
      </div>
      <div class="wl-body">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    showList() {
      document.getElementById("wl-text").classList.toggle("hidden")
      setTimeout(() => {
        document.getElementById("wl-text").classList.toggle("hidden")
      }, 150)
      document.querySelector(".wl").classList.toggle("wl-up")
      document.querySelector(".wl-head").classList.toggle("bg-[#efefef]")
      document.querySelector(".wl-left").classList.toggle("w-2/12")
      document.querySelector(".wl-left-image").classList.toggle("ml-[calc(calc(100%_-_16px)/2)]")
      document.querySelector(".wl-right").classList.toggle("w-10/12")
      document.querySelector(".wl-right").classList.toggle("text-center")
      if (document.getElementById("wl-text").innerText !== "Watchlist") {
        document.getElementById("wl-text").innerText = "Watchlist"
      } else {
        document.getElementById("wl-text").innerText = "2"
      }
    }
  }
}
</script>