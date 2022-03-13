<template>
  <div>
    <div class="container">

      <div class="columns mt-6" style="height: 100vh">
        <div class="column is-4 is-offset-4">

          <form>
            <input placeholder="Korean Dramas like..." autocomplete="off" id="custom-input" @input="search"
                   class="custom-input">
            <img class="search-custom-svg" src="/templates/searchCustom.svg" alt="">
            <select @change="changeSearchType" class="search-in-input">
              <option value="name">Search by Name</option>
              <option value="tag">Search by Tag</option>
            </select>
            <div class="ghost"></div>
            <div class="left-border"></div>
            <div class="series-dropdown">
              <ul class="series-dropdown-ul"></ul>
            </div>
            <div class="tags-dropdown">
              <div class="columns">
                <div class="column tag-result-left"></div>
                <div class="column tag-result-right">
                  <ul class="tag-result-right-ul"></ul>
                </div>
                <a class="tag-search-button">Search</a>
              </div>
            </div>
          </form>


        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "custom",
  data() {
    return {
      searchType: "name"
    }
  },
  methods: {

    search() {

      const value = document.getElementById("custom-input").value.toLowerCase()
      if (value.length > 2) {
        let arr = []
        const path = this.searchType === "name" ? "/api/series?q=" : "/api/tags?q="
        axios.get(path + value)
            .then((res) => {
              res.data.forEach(element => {
                arr.push(this.pointedWords(element, value, this.searchType))
              })

              document.getElementsByClassName("series-dropdown-ul")[0].innerHTML = arr.join("")

            })
            .catch((err) => {
              console.log("q param error " + err);
            })
      }

      this.seriesDropdownCSS(value.length)


    },

    pointedWords(element, value, type) {
      const word = type === "name" ? element[1] : element
      const firstPos = word.toLowerCase().match(value)["index"]
      const lastPos = word.toLowerCase().match(value)["index"] + value.length
      const pointedWord = word.substring(firstPos, lastPos)
      const firstPart = word.substring(0, firstPos)
      const lastPart = word.substring(lastPos, word.length)
      const pointedHTML = `<span id="span1">${firstPart}</span><span id="span2" class="has-text-weight-bold">${pointedWord}</span><span id="span3">${lastPart}</span>`
      return `<li class="li-class"><a class="custom-dropdown-item has-text-black">${pointedHTML}</a></li>`
    },

    changeSearchType() {
      this.searchType = document.getElementsByClassName("search-in-input")[0].value
    },

    seriesDropdownCSS(len) {
      document.getElementsByClassName("series-dropdown")[0].style.display = len > 2 ? "block" : null
      document.getElementsByClassName("ghost")[0].style.display = len > 2 ? "block" : null
      document.getElementsByClassName("custom-input")[0].style.borderBottomLeftRadius = len > 2 ? "0" : null
      document.getElementsByClassName("custom-input")[0].style.borderBottomRightRadius = len > 2 ? "0" : null
      document.getElementsByClassName("search-in-input")[0].style.borderBottom = len > 2 ? "1px solid #dbdbdb" : null
      document.getElementsByClassName("search-in-input")[0].style.borderBottomRightRadius = len > 2 ?  "0" : null
    }

  }
}
</script>


<style>
html {
  background: white !important;
}

.custom-input {
  width: 100%;
  height: 36px;
  border-radius: 12px;
  outline: none;
  border: none;
  background-color: #EFEFEF;
  padding-left: 36px;
  color: #666666;
  font-size: 14px;
  position: relative;
}

.custom-input:focus {
  box-shadow: 0 1px 6px rgb(32 33 36 / 30%);
  border: none;
  outline: none;
}

.search-custom-svg {
  position: absolute;
  width: 20px;
  top: 8px;
  left: 8px;
}


.search-in-input {
  position: absolute;
  right: 0;
  height: 36px;
  background-color: #EFEFEF;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  outline: none;
  z-index: 11;
  border-bottom: 1px solid #efefef;
  border-top: none;
  border-left: none;
  border-right: none;
}

.search-in-input:hover {
  background-color: #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  /*border-bottom-right-radius: 12px !important;*/
}

.custom-input:focus ~ .search-in-input:hover {
  border-bottom-right-radius: 0;
}

.custom-input:focus ~ .search-in-input {
  /*border-bottom: 1px solid #dbdbdb;*/
}

.left-border {
  background-color: #dbdbdb;
  position: absolute;
  width: 1px;
  height: 30px;
  top: 3px;
  left: calc(100% - 117px);
  z-index: 11;
}

.series-dropdown {
  display: none;
  position: absolute;
  /*top: 36px;*/
  /*height: 360px;*/
  width: 100%;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0 1px 6px rgb(32 33 36 / 30%);
  background-color: white;
}

.tags-dropdown {
  display: none;
  position: absolute;
  /*top: 36px;*/
  height: 288px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgb(32 33 36 / 30%);
  background-color: white;
}

.custom-input:focus {
  /*border-bottom-left-radius: 0;*/
  /*border-bottom-right-radius: 0;*/
}

.custom-input:focus ~ .series-dropdown {
  /*display: block;*/
  /*border-top-left-radius: 0;*/
  /*border-top-right-radius: 0;*/
}

.custom-input:focus ~ .tags-dropdown {
  /*display: block;*/
  /*border-top-left-radius: 0;*/
  /*border-top-right-radius: 0;*/
}

.custom-input:focus ~ .tags-dropdown .tag-result-left {
  /*display: block;*/
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.custom-input:focus ~ .tags-dropdown .tag-result-right {
  border-top-right-radius: 0;
}

.ghost {
  top: 30px;
  z-index: 10;
  display: none;
  width: 100%;
  height: 6px;
  position: absolute;
  background-color: #EFEFEF;
  border-bottom: 1px solid #dbdbdb;
}

.custom-input:focus ~ .ghost {
  /*display: block;*/
}

.tag-result-left {
  height: 100%;
  width: 50%;
  /*background-color: pink;*/
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-right: 1px solid #dbdbdb;
}

.tag-result-right {
  height: calc(100% - 36px);
  width: 50%;
  /*background-color: deeppink;*/
  position: absolute;
  right: 0;
  top: 0;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  overflow-x: auto;
}

.tag-search-button {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  border-bottom-right-radius: 12px;
  border-top: 1px solid #dbdbdb;
  height: 36px;
  background-color: #EFEFEF;
  text-align: center;
  line-height: 36px;
  font-size: 18px;
  color: #666666;
}

.tag-search-button:hover {
  background-color: #dbdbdb;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
}

.li-class {
  height: 36px;
  line-height: 36px;
  padding-left: 36px;
  padding-right: 36px;
  font-size: 14px;
}

.li-class:hover {
  background-color: #efefef;
  /*transition: all .2s;*/
  /*height: 36px;*/
}

.li-class:hover:last-child {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}


.custom-dropdown-item {
  /*height: 30px;*/
  /*line-height: normal;*/
  /*padding: 0.375rem 1rem;*/
  display: block;
}


</style>