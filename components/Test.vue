<template>
  <div>
    <form id="form-element">
      <input @input="search" placeholder="Korean Dramas like..." autocomplete="off" id="custom-input"
             class="custom-input">
      <img class="search-custom-svg" src="/templates/searchCustom.svg" alt="">
      <select @change="changeSearchType" class="search-in-input">
        <option value="name">Search by Name</option>
        <option value="tag">Search by Tag</option>
      </select>
      <div class="ghost"></div>
      <div class="left-border"></div>
      <div class="series-dropdown">
        <ul @click="setInputValue" class="series-dropdown-ul"></ul>
      </div>
      <div class="tags-dropdown">
        <div class="columns">
          <div class="column tag-result-left">
            <ul @click="addCard" class="tag-result-left-ul"></ul>
          </div>
          <div class="column tag-result-right">
            <!--            <ul class="tag-result-right-ul"></ul>-->
          </div>
          <a class="tag-search-button">Search</a>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "custom",
  data() {
    return {
      searchType: "name",
      arr: [],
      len: 0,
      randomColor: ["is-primary", "is-link", "is-info", "is-success", "is-warning", "is-danger"]
    }
  },

  mounted() {
    window.addEventListener("click", (e) => {
      if (!document.getElementById("form-element").contains(e.target)) {
        this.seriesDropdownCSS(0)
      }
    })


  },
  methods: {
    setInputValue(e) {
      document.getElementsByClassName("custom-input")[0].value = e.target.tagName === "LI" ? e.target.textContent : e.target.parentNode.textContent
      this.seriesDropdownCSS(0)
      if (this.searchType === "tag") {
        this.seriesDropdownCSS(1)
      }
    },

    search() {
      const value = document.getElementById("custom-input").value.toLowerCase()
      const className = this.searchType === "name" ? "series-dropdown-ul" : "tag-result-left-ul"
      if (value.length > 2) {
        const path = this.searchType === "name" ? "/api/series?q=" : "/api/tags?q="
        axios.get(path + value)
            .then(res => {
              this.arr = []
              res.data.forEach(element => {
                this.arr.push(this.pointedWords(element, value, this.searchType))
              })

              document.getElementsByClassName(className)[0].innerHTML = this.arr.join("")
              if (res.data.length > 1) {
                this.seriesDropdownCSS(1)
              } else if (res.data.length === 0 && this.searchType === "name") {
                this.seriesDropdownCSS(0)
              } else {
                this.seriesDropdownCSS(1)
              }

            })
            .catch((err) => {
              console.log("q param error " + err);
            })

      } else {
        document.getElementsByClassName(className)[0].innerHTML = ""

        this.searchType === "name" ? this.seriesDropdownCSS(0) : null
      }
    },

    pointedWords(element, value, type) {
      const id = type === "name" ? element[0] : null
      const word = type === "name" ? element[1] : element
      const year = type === "name" ? element[2] : null
      const firstPos = word.toLowerCase().match(value)["index"]
      const lastPos = word.toLowerCase().match(value)["index"] + value.length
      const pointedWord = word.substring(firstPos, lastPos)
      const firstPart = word.substring(0, firstPos)
      const lastPart = word.substring(lastPos, word.length)
      let urlx = word.replace(/[^a-zA-Z0-9 ]/g, "")
      let url = urlx.replace(/ /g, "-")

      const pointedHTML = `<span id="span1">${firstPart}</span><span id="span2" class="has-text-weight-bold">${pointedWord}</span><span id="span3">${lastPart}</span>`
      if (type === "name") {
        const href = "like/" + url + "--" + id
        return `<li class="li-class"><a href=${href} class="custom-dropdown-item"><span style="margin-left: 36px">${pointedHTML} (${year})</span></a></li>`
      } else if (type === "tag") {
        const href = "#"
        return `<li class="li-class"><a href="${href}" class="custom-dropdown-item"><span style="margin-left: 4px">${pointedHTML}</span></a></li>`
      }

    },

    changeSearchType() {
      document.getElementsByClassName("custom-input")[0].value = ""
      this.searchType = document.getElementsByClassName("search-in-input")[0].value
      this.seriesDropdownCSS(0)
      this.searchType === "name" ? document.getElementsByClassName("tags-dropdown")[0].style.display = "none" : null
      this.searchType === "tag" ? document.getElementsByClassName("series-dropdown")[0].style.display = "none" : null
    },

    seriesDropdownCSS(state) {
      if (this.searchType === "name") {
        document.getElementsByClassName("series-dropdown")[0].style.display = state === 1 ? "block" : "none"
      } else {
        document.getElementsByClassName("tags-dropdown")[0].style.display = state === 1 ? "block" : "none"
      }

      document.getElementsByClassName("ghost")[0].style.display = state === 1 ? "block" : "none"
      document.getElementsByClassName("custom-input")[0].style.borderBottomLeftRadius = state === 1 ? "0" : "12px"
      document.getElementsByClassName("custom-input")[0].style.borderBottomRightRadius = state === 1 ? "0" : "12px"
      document.getElementsByClassName("search-in-input")[0].style.borderBottom = state === 1 ? "1px solid #dbdbdb" : null
      document.getElementsByClassName("search-in-input")[0].style.borderBottomRightRadius = state === 1 ? "0" : "12px"
      const input = document.getElementsByClassName("custom-input")[0]
      state === 1 ? input.classList.add("custom-shadow") : input.classList.remove("custom-shadow")
    },

    addCard(e) {
      let text = e.target.tagName === "LI" ? e.target.textContent : e.target.parentNode.textContent
      const dataAttribute = text
      const randomColor = this.randomColor[Math.floor(Math.random() * this.randomColor.length)]
      text.length > 26 ? text = text.substring(0, 26) + "..." : null
      const tag = `<div class="column is-narrow p-1" style="display: block">
                        <span data-innertext="${dataAttribute}" style="border: 1px solid #dbdbdb" class="tag ${randomColor} is-light">
                              ${text}<button type="button" class="delete is-small"></button>
                        </span>
                   </div>`
      document.getElementsByClassName("tag-result-right")[0].innerHTML += tag

    }


  }
}
</script>


<style>


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
  z-index: 6;
}

.tags-dropdown {
  display: none;
  position: absolute;
  /*top: 36px;*/
  /*height: 180px;*/
  height: 360px;
  width: 100%;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  box-shadow: 0 1px 6px rgb(32 33 36 / 30%);
  background-color: white;
  z-index: 6;
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
  padding: 0;
  /*background-color: pink;*/
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-right: 1px solid #dbdbdb;
  overflow-x: auto;
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
  /*height: 36px;*/
  line-height: 36px;
  /*padding-left: 36px;*/
  padding-right: 3px;
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
  display: block;
  color: #4A4A4A;
}

.custom-shadow {
  box-shadow: 0 1px 6px rgb(32 33 36 / 30%);
}


</style>