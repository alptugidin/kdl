<template>
  <div>

    <form id="form-element">
      <div class="custom-div">
        <input @input="search" placeholder="Korean Dramas like..." autocomplete="off" id="custom-input"
               class="custom-input">
        <div class="full-page-background"></div>
        <img class="search-custom-svg" src="/templates/searchCustom.svg" alt="">
        <select @change="changeSearchType" class="search-in-input">
          <option value="name">Search by Name</option>
          <option value="tag">Search by Tag</option>
        </select>
        <div class="ghost"></div>
        <div class="left-border"></div>
      </div>
      <div class="series-dropdown">
        <ul @click="setInputValue" class="series-dropdown-ul"></ul>
      </div>
      <div class="tags-dropdown">
        <div class="columns">
          <div class="column tag-result-left">
            <ul @click="addTag" class="tag-result-left-ul"></ul>
          </div>
          <div class="column tag-result-right">
            <div @click="removeTag" id="tag-result-columns" class="columns is-centered is-multiline"></div>
          </div>
          <a @click="searchByTag" class="tag-search-button">Search</a>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import axios from "axios";
import Custom from "@/layouts/custom";

export default {
  components: {Custom},
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
        const href = "/like/" + url + "--" + id
        return `<li class="li-class"><a href=${href} class="custom-dropdown-item"><span style="margin-left: 36px">${pointedHTML} (${year})</span></a></li>`
      } else if (type === "tag") {
        const href = "#"
        return `<li class="li-class"><a href="${href}" class="custom-dropdown-item"><span style="margin-left: 4px">${pointedHTML}</span></a></li>`
      }

    },

    changeSearchType() {
      document.querySelector(".custom-input").value = ""
      this.searchType = document.querySelector(".search-in-input").value
      this.seriesDropdownCSS(0)
      this.searchType === "name" ? document.querySelector(".tags-dropdown").style.display = "none" : null
      this.searchType === "tag" ? document.querySelector(".series-dropdown").style.display = "none" : null

      if (this.searchType === "name") {
        document.querySelector(".tags-dropdown").style.display = "none"
        document.querySelector(".custom-input").placeholder = "Korean Dramas like..."
      } else {
        document.querySelector(".series-dropdown").style.display = "none"
        document.querySelector(".custom-input").placeholder = "e.g. Romance"
      }

    },

    seriesDropdownCSS(state) {
      if (this.searchType === "name") {
        document.querySelector(".series-dropdown").style.display = state === 1 ? "block" : "none"
      } else {
        document.querySelector(".tags-dropdown").style.display = state === 1 ? "block" : "none"
      }
      document.querySelector(".ghost").style.display = state === 1 ? "block" : "none"
      document.querySelector(".custom-input").style.borderBottomLeftRadius = state === 1 ? "0" : "12px"
      document.querySelector(".custom-input").style.borderBottomRightRadius = state === 1 ? "0" : "12px"
      document.querySelector(".search-in-input").style.borderBottom = state === 1 ? "1px solid #dbdbdb" : null
      document.querySelector(".search-in-input").style.borderBottomRightRadius = state === 1 ? "0" : "12px"
      const input = document.querySelector(".custom-input")
      state === 1 ? input.classList.add("custom-shadow") : input.classList.remove("custom-shadow")
    },

    addTag(e) {
      let text = e.target.tagName === "LI" ? e.target.textContent : e.target.parentNode.textContent
      const dataAttribute = text
      const randomColor = this.randomColor[Math.floor(Math.random() * this.randomColor.length)]
      text.length > 26 ? text = text.substring(0, 26) + "..." : null
      const tag = `<div class="column is-narrow p-1" style="display: block"><span data-innertext="${dataAttribute}" style="border: 1px solid #dbdbdb" class="tag ${randomColor} is-light">${text}<button type="button" class="delete is-small"></button></span></div>`
      document.getElementById("tag-result-columns").innerHTML += tag
      document.querySelector(".custom-input").value = ""
      document.querySelector(".custom-input").focus()
    },

    removeTag(e) {
      e.target.type === "button" ? e.target.parentNode.parentNode.style.display = "none" : null
      document.querySelector(".custom-input").focus()
    },

    searchByTag() {
      const carts = document.getElementById("tag-result-columns").childNodes
      const tags = []
      carts.forEach(element => {
        if (element.style.display === "block") {
          tags.push(element.childNodes[0].attributes[0].value.replaceAll(" ", "_"))
        }
      })
      const unique = [...new Set(tags)]
      unique.sort()
      const query = unique.join("--")
      window.location.href = "/tag/" + query + "?p=1"
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
  /*z-index: 11;*/
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
  /*z-index: 11;*/
}


.search-in-input {
  position: absolute;
  right: 0;
  top: 0;
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
  width: 120px;
}


.search-in-input:hover {
  background-color: #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
}


.custom-input:focus ~ .search-in-input:hover {
  border-bottom-right-radius: 0;
}


.left-border {
  background-color: #dbdbdb;
  position: absolute;
  width: 1px;
  height: 30px;
  top: 3px;
  left: calc(100% - 120px);
  z-index: 11;
}

.series-dropdown {
  display: none;
  position: absolute;
  width: 100%;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0 1px 6px rgb(32 33 36 / 30%);
  background-color: white;
  z-index: 6;
}

.series-dropdown-ul li:last-child {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.tags-dropdown {
  display: none;
  position: absolute;
  height: 360px;
  width: 100%;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  box-shadow: 0 1px 6px rgb(32 33 36 / 30%);
  background-color: white;
  z-index: 6;
}

.custom-input:focus ~ .tags-dropdown .tag-result-left {
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


.tag-result-left {
  height: 100%;
  width: 50%;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  border-bottom-left-radius: 12px;
  border-right: 1px solid #dbdbdb;
  overflow-x: auto;
}

.tag-result-right {
  height: calc(100% - 36px);
  width: 50%;
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
  line-height: 36px;
  padding-right: 3px;
  font-size: 14px;
}

.li-class:hover {
  background-color: #efefef;
}


.custom-dropdown-item {
  display: block;
  color: #4A4A4A;
}

.custom-shadow {
  box-shadow: 0 1px 6px rgb(32 33 36 / 30%);
}

.full-page-background {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100vh;
  background-color: black;
  z-index: 10;
  opacity: .1;
}

.custom-input:focus ~ .full-page-background {
  /*display: block;*/
}

form {
  display: block;
  position: relative;
}


</style>