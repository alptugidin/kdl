<template>
  <div>
    <nav id="nav1" class="pagination is-centered is-rounded" role="navigation" aria-label="pagination"
         v-if="parseInt(totalPageProp) < 7">
      <ul class="pagination-list">
        <li @click="Href" v-for="i in parseInt(totalPageProp)">
          <a class="pagination-link" aria-label="Goto page 1">
            {{ i }}
          </a>
        </li>
      </ul>
    </nav>

    <nav id="nav2" class="pagination is-centered is-rounded " role="navigation" aria-label="pagination" v-else>
      <!--      <a v-if="parseInt(currentPageProp)> 1" class="pagination-previous"-->
      <!--         :href="'/tag/' + tagsProp + '?p=' + (parseInt(currentPageProp) - 1)"-->
      <!--      >Previous</a>-->
      <!--      <a v-if="parseInt(currentPageProp) < parseInt(totalPageProp)" class="pagination-next"-->
      <!--         :href="'/tag/' + tagsProp + '?p=' + (parseInt(currentPageProp) + 1)"-->
      <!--      >Next</a>-->

      <ul class="pagination-list" v-if="parseInt(currentPageProp) < 5">
        <li @click="Href" v-for="i in 5" v-if=" i < (parseInt(currentPageProp) + 2) && i < parseInt(totalPageProp)">
          <a class="pagination-link">
            {{ i }}
          </a>
        </li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li @click="Href"><a class="pagination-link" aria-label="Goto page 1">{{ totalPageProp }}</a></li>
      </ul>

      <ul class="pagination-list"
          v-else-if="parseInt(currentPageProp) >= 5 && parseInt(currentPageProp) < (parseInt(totalPageProp) - 3) ">
        <li @click="Href"><a class="pagination-link" aria-label="Goto page">1</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li @click="Href"><a class="pagination-link" aria-label="Goto page">{{ parseInt(currentPageProp) - 1 }}</a></li>
        <li @click="Href"><a class="pagination-link" aria-label="Goto page">{{ currentPageProp }}</a></li>
        <li @click="Href"><a class="pagination-link" aria-label="Goto page">{{ parseInt(currentPageProp) + 1 }}</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li @click="Href"><a class="pagination-link" aria-label="Goto page">{{ totalPageProp }}</a></li>
      </ul>


      <ul class="pagination-list" v-else>
        <li @click="Href"><a class="pagination-link" aria-label="Goto page">1</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li @click="Href"><a class="pagination-link" aria-label="Goto page">{{ parseInt(currentPageProp) - 1 }}</a></li>
        <li @click="Href"><a class="pagination-link" aria-label="Goto page">{{ parseInt(currentPageProp) }}</a></li>
        <li @click="Href" v-for="i in 5" v-if="(parseInt(currentPageProp)+i) <= totalPageProp"><a
          class="pagination-link">{{ parseInt(currentPageProp) + i }}</a></li>
      </ul>


    </nav>

  </div>


</template>

<script>
export default {
  props: ["currentPageProp", "totalPageProp", "tagsProp"],
  data() {
    return {}
  },
  methods: {
    Href(e) {
      if (e.target.innerText !== this.currentPageProp) {
        e.target.innerText !== "..." ? window.location.href = `/tag/${this.tagsProp}?p=${e.target.innerText}` : null
      }


    }
  },
  mounted() {
    [...document.getElementsByClassName("pagination-link")].forEach(element => {
      if (element.innerText === this.currentPageProp) {
        element.classList.add("is-current")
      }
    })
  }


}
</script>

<style>

#nav1, #nav2 {
  margin-bottom: 10vh;
  margin-top: 5vh;
}

.pagination{
  width: 100%;
}


</style>
