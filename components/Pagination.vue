<template>
  <div>
    <div id="pagination1" class="columns is-mobile is-centered pagination-main" v-if="parseInt(totalPageProp) < 7">

      <div v-if="parseInt(currentPageProp) > 1" class="column is-narrow">
        <div class="prev-page">
          <a :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp) - 1)" href="#" style="display: block;">
            <img class="prev-page-svg" src="/templates/prev-page.svg" alt="prev-page-svg">
          </a>
        </div>
      </div>

      <div class="column is-narrow px-0 pagination-main">
        <ul class="paginaton-middle">
          <li class="pagination-middle-li" v-for="i in parseInt(totalPageProp)">
            <a :href="$nuxt.$route.path + '?p=' + i">
              {{ i }}
            </a>
          </li>
        </ul>
      </div>

      <div v-if="parseInt(currentPageProp) < parseInt(totalPageProp)" class="column is-narrow">
        <div class="next-page">
          <a :href="$nuxt.$route.path + '?p='+   (parseInt(currentPageProp) + 1)" style="display: block">
            <img class="next-page-svg" src="/templates/next-page.svg" alt="svg">
          </a>
        </div>
      </div>

    </div>

    <div id="pagination2" class="columns is-mobile is-centered" v-else>

      <div v-if="parseInt(currentPageProp ) > 1" class="column is-narrow">
        <div class="prev-page">
          <a :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp) - 1)" style="display: block">
            <img class="prev-page-svg" src="/templates/prev-page.svg" alt="prev-page-svg">
          </a>
        </div>
      </div>


      <div class="column is-narrow px-0 pagination-main">
        <ul class="pagination-middle" v-if="parseInt(currentPageProp) < 5">
          <li v-for="i in 5" v-if=" i < (parseInt(currentPageProp) + 2) && i < parseInt(totalPageProp)"
              class="pagination-middle-li">
            <a :href="$nuxt.$route.path + '?p=' + i">
              {{ i }}
            </a>
          </li>
          <li class="pagination-middle-li dot"><span>&hellip;</span></li>
          <li class="pagination-middle-li"><a
              :href="$nuxt.$route.path + '?p=' + totalPageProp">{{ totalPageProp }}</a></li>
        </ul>

        <ul class="pagination-middle"
            v-else-if="parseInt(currentPageProp) >= 5 && parseInt(currentPageProp) < (parseInt(totalPageProp) - 3) ">
          <li class="pagination-middle-li"><a :href="$nuxt.$route.path + '?p=' + 1">1</a></li>
          <li class="pagination-middle-li dot"><span>&hellip;</span></li>
          <li class="pagination-middle-li"><a
              :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp) -1)">{{ parseInt(currentPageProp) - 1 }}</a>
          </li>
          <li class="pagination-middle-li"><a
              :href="$nuxt.$route.path + '?p=' + currentPageProp">{{ currentPageProp }}</a></li>
          <li class="pagination-middle-li"><a
              :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp) + 1)">{{ parseInt(currentPageProp) + 1 }}</a>
          </li>
          <li class="pagination-middle-li dot"><span>&hellip;</span></li>
          <li class="pagination-middle-li"><a
              :href="$nuxt.$route.path + '?p=' + totalPageProp">{{ totalPageProp }}</a></li>
        </ul>


        <ul class="pagination-middle" v-else>
          <li class="pagination-middle-li"><a :href="$nuxt.$route.path + '?p=' + 1">1</a></li>
          <li class="pagination-middle-li dot"><span>&hellip;</span></li>
          <li class="pagination-middle-li"><a
              :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp) - 1)">{{ parseInt(currentPageProp) - 1 }}</a>
          </li>
          <li class="pagination-middle-li"><a
              :href="$nuxt.$route.path + '?p=' + currentPageProp">{{ parseInt(currentPageProp) }}</a></li>
          <li class="pagination-middle-li" v-for="i in 5"
              v-if="(parseInt(currentPageProp)+i) <= totalPageProp">
            <a :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp) + i)">{{
                parseInt(currentPageProp) + i
              }}</a></li>
        </ul>

      </div>

      <div v-if="parseInt(currentPageProp) < parseInt(totalPageProp)" class="column is-narrow">
        <div class="next-page">
          <a :href="$nuxt.$route.path + '?p=' + (parseInt(currentPageProp)+1)" style="display: block">
            <img class="next-page-svg" src="/templates/next-page.svg" alt="svg">
          </a>
        </div>
      </div>

    </div>

  </div>


</template>

<script>
export default {
  props: ["currentPageProp", "totalPageProp", "tagsProp"],
  data() {
    return {}
  },
  methods: {

  },
  mounted() {

    [...document.getElementsByClassName("pagination-middle-li")].forEach(element => {
      if (element.innerText === this.currentPageProp) {
        element.classList.add("is-current")
        if (element.innerText === "1") {
          element.classList.add("first-page-style")
        }
        if (element.innerText === this.totalPageProp.toString()) {
          element.classList.add("last-page-style")
        }
      }
    })


  }


}
</script>

<style>


.is-current {
  background-color: #1460d9 !important;
  border-top: 1px solid #1460d9 !important;
  border-bottom: 1px solid #1460d9 !important;
  pointer-events: none;
}


.is-current a {
  font-weight: bold;
  color: white !important;
}


.pagination-middle-li:first-child {
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
  border-left: 1px solid #dbdbdb;
}

.pagination-middle-li:last-child {
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
  border-right: 1px solid #dbdbdb;
}

.pagination-middle-li {
  background-color: #EFEFEF;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  float: left;
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 34px;
  transition: .1s;
}

.pagination-middle-li:hover:not(.dot) {
  background-color: #dbdbdb;
  cursor: pointer;
}


.pagination-middle-li:first-child:hover {
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
  border-left: 1px solid #dbdbdb;
}

.pagination-middle-li:last-child:hover {
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
  border-right: 1px solid #dbdbdb;
}

.pagination-middle-li a {
  color: #4A4A4A;
  font-size: 15px;
  font-weight: 500;
  display: block;
}

.pagination-middle-li:hover a {
  cursor: unset;
}

.prev-page, .next-page {
  width: 36px;
  height: 36px;
  background-color: #EFEFEF;
  border-radius: 999px;
  border: 1px solid #dbdbdb;
}


.prev-page-svg, .next-page-svg {
  width: 26px;
  margin-left: 5px;
  margin-top: 5px;
}


.prev-page:hover, .next-page:hover {
  background-color: #1460d9;
  border: 1px solid #1460d9;
}

.prev-page:hover a img, .next-page:hover a img {
  filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(16deg) brightness(109%) contrast(101%);
}

.dot {
  cursor: unset;
}

#pagination1, #pagination2 {
  margin-bottom: 10vh;
  margin-top: 5vh;
}

.first-page-style {
  border-left: #1460d9 !important;
}

.last-page-style {
  border-right: #1460d9 !important;
}

</style>
