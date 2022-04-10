<template>
  <div>
    <div id="wl"
         :class="'rounded-t-lg fixed bottom-0 right-5 custom-shadow bg-[white] z-20 transition-all ' + dim">
      <div @click="changeWl" id="wlhead" :class="'w-full flex h-[36px] cursor-pointer rounded-t-lg ' + bg">
        <div :class="headWidth1 + ' h-[36px]'">
          <img src="/templates/fav.svg" alt="" class="mt-[8px] ml-[8px]">
        </div>
        <div :class="headWidth2">
          <span :class="'text-[#C71B2B] font-semibold block ' + display + fontSize ">{{ wlText }}</span>
        </div>
      </div>
      <div :class="'max-h-[360px] overflow-auto block ' + display">
        <ul id="wl-ul">
          <li v-for="serie in $store.state.watchList"
              class="h-[36px] w-full border border-b-[#dbdbdb] border-t-0 border-x-0 relative">
            <div class="pl-2 pr-[24px] leading-[36px] text-sm">
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

  name: "Watchlist2",

  data() {
    return {
      isOpen: false,
      dummy: false
    }
  },

  computed: {
    wlText: function () {
      return this.isOpen ? "Watchlist" : this.$store.getters.getWatchlistSize
    },

    dim: function () {
      return this.isOpen ? "wl-max" : "wl-min"
    },

    bg: function () {
      return this.isOpen ? "bg-[#efefef]" : "bg-[white]"
    },

    headWidth1: function () {
      return this.isOpen ? "w-2/12" : "w-1/2"
    },

    headWidth2: function () {
      return this.isOpen ? "w-10/12 text-left leading-[36px]" : "w-1/2 text-center"
    },

    display: function () {
      return this.dummy ? "hidden " : ""
    },

    fontSize: function () {
      return this.isOpen ? "text-[20px] " : "text-[23px] "
    }

  },

  beforeMount() {
    this.$store.commit("updateWatchlist")
  },

  mounted() {
    window.addEventListener("click", e => {
      if (!document.querySelector("#wl").contains(e.target) && document.querySelector("#wl").classList.contains("wl-max") && e.target.tagName !== "IMG") {
        this.isOpen = false
        this.changeDisplay()
      }
    })
  },



  methods: {

    changeWl() {
      this.isOpen = !this.isOpen
      this.changeDisplay()
    },

    changeDisplay() {
      this.dummy = true
      setTimeout(() => {
        this.dummy = false
      }, 150)
    },


    removeFromList(e) {
      const serie = e.currentTarget.parentNode.textContent.trim()
      const currentStorage = JSON.parse(localStorage.getItem("f"))
      const arr = currentStorage.filter(e => e !== serie)
      localStorage.setItem("f", JSON.stringify(arr))
      this.$store.commit("updateWatchlist")
    }
  }
}
</script>

