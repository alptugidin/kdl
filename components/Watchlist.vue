<template>
  <div>
    <div class="fixed right-5 bottom-0 z-20">
      <div @click="changeWatchlistState"
           class="flex watchlist-head absolute left-[230px] top-[-36px] w-[70px] h-[36px] bg-[white] rounded-tl-lg rounded-tr-lg  custom-shadow cursor-pointer">
        <div class="wd-hd-fc w-1/2 h-full py-2 pl-3">
          <img src="/templates/fav.svg" alt="" class="">
        </div>
        <div class="wd-hd-sc w-1/2 h-full leading-[36px] text-center pr-3">
          <span id="wl-span" class="text-xl text-[#C7042C] font-semibold">1</span>
        </div>
        <div id="min-chevron" class="p-1 absolute right-0 top-[3px] hidden">
          <img src="/templates/minimize.svg" alt="">
        </div>

      </div>
      <div id="watchlist-ghost" class="w-full h-[6px] bg-[white] absolute border border-t-[#dbdbdb] border-b-0 border-x-0"></div>
      <div
          class="watchlist w-[300px] h-[360px] max-h-[360px] overflow-auto bg-[white] custom-shadow mb-[-360px] transition-all leading-[36px] ">
        <ul id="watchlist-ul" class="">
          <li v-for="i in 12" class="wl-li h-[36px] px-1 border border-b-[#dbdbdb] border-t-0 border-x-0 font-semibold ubuntu-font hover:bg-[#dbdbdb]">Korean Drama</li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Watchlist",
  data() {
    return {
      state: false,
      watchlistLen: 1
    }
  },
  methods: {
    changeWatchlistState() {
      document.querySelector(".watchlist").classList.toggle("wl-open")
      document.querySelector(".watchlist-head").classList.toggle("wl-hd-open")
      document.querySelector(".wd-hd-fc").classList.toggle("fc-open")
      document.querySelector(".wd-hd-sc").classList.toggle("sc-open")
      document.querySelector("#min-chevron").classList.toggle("hidden")

      setTimeout(function () {
        const value = document.getElementById("wl-span").innerText
        if (value !== "Watchlist") {
          document.getElementById("wl-span").innerText = "Watchlist"
        } else {
          document.getElementById("wl-span").innerText = 1
        }
      }, 50)


    }
  },

}
</script>
