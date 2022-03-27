<template>
  <div>

    <!--  If total page number < 7  -->
    <div id="pagination-1" v-if="totalPageProp < 7" class="py-20 flex justify-center">

      <div v-if="currentPageProp > 1" class="pagination-prev">
        <a :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp) - 1 )" class="block">
          <img src="/templates/prev-page.svg" alt="prev-page-svg" class="">
        </a>
      </div>

      <div class="pagination-parent mx-5">
        <div v-for="i in parseInt(totalPageProp)" class="pagination-child">
          <a :href="$nuxt.$route.path + '?p=' + i" class="block">{{ i }}</a>
        </div>
      </div>

      <div v-if="currentPageProp < totalPageProp" class="pagination-next">
        <a :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp) + 1)" class="block">
          <img src="/templates/next-page.svg" alt="next-page-svg">
        </a>
      </div>

    </div>

    <!--  If total page number > 7  -->
    <div id="pagination-2" class="py-20 flex justify-center" v-else>

      <div v-if="currentPageProp > 1" class="pagination-prev">
        <a :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp) - 1 )" class="block">
          <img src="/templates/prev-page.svg" alt="prev-page-svg" class="">
        </a>
      </div>

      <!--   If current page < 5   -->
      <div v-if="currentPageProp < 5" class="pagination-parent mx-5">
        <div v-for="i in 5" v-if=" i < parseInt((currentPageProp) + 2) && i < parseInt(totalPageProp)"
             class="pagination-child">
          <a :href="$nuxt.$route.path + '?p=' + i" class="block">{{ i }}</a>
        </div>
        <div class="dot">&hellip;</div>
        <div class="pagination-child">
          <a :href="$nuxt.$route.path + '?p=' + totalPageProp" class="block">{{ totalPageProp }}</a>
        </div>
      </div>

      <div v-else-if="currentPageProp >= 5 && currentPageProp < (totalPageProp - 3)" class="pagination-parent mx-5">
        <div class="pagination-child"><a :href="$nuxt.$route.path + '?p=' + 1" class="block">1</a></div>
        <div class="dot">&hellip;</div>
        <div class="pagination-child">
          <a :href="$nuxt.$route.path + '?p=' + (currentPageProp - 1)" class="block">{{ currentPageProp - 1 }}</a>
        </div>
        <div class="pagination-child">
          <a :href="$nuxt.$route.path + '?p=' + currentPageProp" class="block">{{ currentPageProp }}</a>
        </div>
        <div class="pagination-child">
          <a :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp) + 1)"
             class="block">{{ parseInt(currentPageProp) + 1 }}</a>
        </div>
        <div class="dot">&hellip;</div>
        <div class="pagination-child"><a :href="$nuxt.$route.path + '?p=' + totalPageProp "
                                         class="block">{{ totalPageProp }}</a></div>
      </div>

      <div v-else class="pagination-parent mx-5">
        <div class="pagination-child"><a :href="$nuxt.$route.path + '?p=' + 1" class="block">1</a></div>
        <div class="dot">&hellip;</div>
        <div class="pagination-child">
          <a :href="$nuxt.$route.path + '?p=' + (currentPageProp - 1)" class="block">{{ currentPageProp - 1 }}</a>
        </div>
        <div class="pagination-child">
          <a :href="$nuxt.$route.path + '?p=' + currentPageProp" class="block">{{ currentPageProp }}</a>
        </div>
        <div class="pagination-child" v-for="i in 5" v-if="(parseInt(currentPageProp) + i) <= parseInt(totalPageProp)">
          <a :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp) + i)"
             class="block">{{ parseInt(currentPageProp) + i }}</a>
        </div>
      </div>

      <div v-if="currentPageProp < totalPageProp" class="pagination-next">
        <a :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp) + 1 )" class="block">
          <img src="/templates/next-page.svg" alt="next-page-svg">
        </a>
      </div>


    </div>

  </div>
</template>


<script>
export default {
  props: [
    "currentPageProp",
    "totalPageProp",
    "tagsProp"
  ],

  mounted() {
    const found = [...document.querySelectorAll(".pagination-child")].find(e => e.textContent === this.currentPageProp)
    found.classList.add("current-page")
  }
}
</script>