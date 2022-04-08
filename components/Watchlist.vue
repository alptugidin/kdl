<template>
  <div>
    <div id="wl-component"
         class="wl fixed w-[70px] h-[396px] bg-[white] rounded-t-lg bottom-0 right-5 z-20 custom-shadow mb-[-360px] transition-all">
      <div @click="showList"
           class="flex wl-head absolute top-0 h-[36px] w-full bg-[white] rounded-t-lg  cursor-pointer leading-[36px] z-20">
        <div class="wl-left w-1/2 h-[36px]">
          <img src="/templates/fav.svg" alt="" class="wl-left-image mt-[8px] ml-[8px]">
        </div>
        <div class="wl-right w-1/2 text-center">
          <span id="wl-text"
                class="font-semibold ubuntu-font text-[#C71B2B] text-[20px] hidden">Watchlist</span>
          <span id="wl-text2"
                class="font-semibold ubuntu-font text-[#C71B2B] text-[20px]">{{
              $store.getters.getWatchlistSize
            }}</span>
        </div>
      </div>
      <div class="wl-body pt-[36px] overflow-auto max-h-[360px]">
        <ul id="wl-ul">
          <li v-for="serie in $store.state.watchList"
              class="h-[36px] w-full border border-b-[#dbdbdb] border-t-0 border-x-0 relative">
            <div class="pl-2 pr-[24px] leading-[36px]">
              <p class="truncate ...">{{ serie }}</p>
            </div>
            <div @click="removeFromList" id="remove">
              <img src="/templates/delete.svg" alt="" class="absolute right-1 bottom-[8px] cursor-pointer">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {

  data() {
    return {
      wl: {},
      storage: [],
      wlOpen: false,
    }
  },
  beforeMount() {
    if (localStorage.hasOwnProperty("f")) {
      this.$store.commit("updateWatchlist")
    }
  },

  mounted() {
    window.addEventListener("click", e => {
      if (!document.querySelector("#wl-component").contains(e.target) && document.querySelector("#wl-component").classList.contains("wl-up")) {
        this.showList()
      }
    })
  },
  methods: {
    showList() {
      setTimeout(() => {
        document.getElementById("wl-ul").classList.toggle("hidden")
        document.querySelector(".wl-right").classList.toggle("hidden")
      }, 150)
      document.getElementById("wl-text").classList.toggle("hidden")
      document.getElementById("wl-text2").classList.toggle("hidden")
      document.getElementById("wl-ul").classList.toggle("hidden")
      document.querySelector(".wl").classList.toggle("wl-up")
      document.querySelector(".wl-head").classList.toggle("bg-[#efefef]")
      document.querySelector(".wl-left").classList.toggle("w-2/12")
      document.querySelector(".wl-left-image").classList.toggle("ml-[calc(calc(100%_-_16px)/2)]")
      document.querySelector(".wl-right").classList.toggle("hidden")
      document.querySelector(".wl-right").classList.toggle("w-10/12")
      document.querySelector(".wl-right").classList.toggle("text-center")
    },

    removeFromList(e) {
      const serie = e.currentTarget.parentNode.textContent.trim()
      const currentStorage = JSON.parse(localStorage.getItem("f"))
      const arr = currentStorage.filter(e => e !== serie)
      localStorage.setItem("f", JSON.stringify(arr))
      this.$store.commit("updateWatchlist")

    }

  },


}
</script>