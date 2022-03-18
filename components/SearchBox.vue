<template>
  <div>
    <form id="form-element" class="relative">
      <input id="custom-input" @input="search" :placeholder="placeholder" autocomplete="off"
             class="bg-[#EFEFEF] h-[36px] w-full outline-0 rounded-xl focus:rounded-t-xl pl-9 text-sm">
      <img src="/templates/searchCustom.svg" alt="svg" class="absolute w-[20px] top-2 left-2">
      <select id="search-in-input" @change="changeSearchType"
              class="absolute right-0 w-auto h-[36px] rounded-r-xl border-b border-[#EFEFEF] bg-[#EFEFEF] hover:bg-[#DBDBDB] text-sm outline-0 z-[11]">
        <option value="name">Search by Name</option>
        <option value="tag">Search by Tag</option>
      </select>
      <div id="ghost"
           class="absolute top-[30px] w-full h-[6px] bg-[#EFEFEF] z-10 border-b border-[#DBDBDB] hidden"></div>
      <div class="bg-[#DBDBDB] absolute w-[1px] h-[30px] top-[3px] right-[122px] z-[11]"></div>
      <div id="series-dropdown" class="bg-white absolute w-full rounded-b-xl block">
        <ul id="series-dropdown-ul"></ul>
      </div>
      <div id="tags-dropdown" class="bg-white absolute w-full h-[360px] rounded-b-xl hidden">
        <div class="grid grid-cols-2">
          <div id="tag-result-left" class="w-full h-[360px] rounded-bl-xl border-r border-[#DBDBDB] overflow-x-auto">
            <ul @click="addTag" id="tag-result-left-ul"></ul>
          </div>
          <div id="tag-result-right" class="w-full h-[360px] rounded-br-xl overflow-x-auto">
            <div @click="removeTag" class="tag-result-right-div p-1"></div>
          </div>
          <a href="#" @click="searchByTag"
             class="absolute w-1/2 right-0 bottom-0 rounded-br-xl text-[18px] text-center text-[#666666] hover:bg-[#DBDBDB] leading-9 h-[36px] bg-[#EFEFEF]">Search</a>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      placeholder: "Korean Dramas like...",
      searchType: "name",
      colors: ["t1", "t2", "t3", "t4", "t5", "t6"]
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

    changeSearchType() {
      document.querySelector("#custom-input").value = ""
      this.searchType = document.querySelector("#search-in-input").value
      this.seriesDropdownCSS(0)
      this.searchType === "name" ? document.querySelector("#tags-dropdown").style.display = "none" : null
      this.searchType === "tag" ? document.querySelector("#series-dropdown").style.display = "none" : null
      if (this.searchType === "name") {
        document.querySelector("#tags-dropdown").style.display = "none"
        document.querySelector("#custom-input").placeholder = "Korean Dramas like..."
      } else {
        document.querySelector("#series-dropdown").style.display = "none"
        document.querySelector("#custom-input").placeholder = "e.g. Romance"
      }
    },

    search() {
      const value = document.getElementById("custom-input").value.toLowerCase()
      const elementID = this.searchType === "name" ? "series-dropdown-ul" : "tag-result-left-ul"
      if (value.length > 2) {
        const path = this.searchType === "name" ? "/api/series?q=" : "/api/tags?q="
        axios.get(path + value)
            .then(res => {
              this.arr = []
              res.data.forEach(element => {
                this.arr.push(this.pointedWords(element, value, this.searchType))
              })
              document.getElementById(elementID).innerHTML = this.arr.join("")
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
        document.getElementById(elementID).innerHTML = ""
        this.searchType === "name" ? this.seriesDropdownCSS(0) : null
      }
    },
    seriesDropdownCSS(state) {
      if (this.searchType === "name") {
        document.querySelector("#series-dropdown").style.display = state === 1 ? "block" : "none"
      } else {
        document.querySelector("#tags-dropdown").style.display = state === 1 ? "block" : "none"
      }

      document.querySelector("#ghost").style.display = state === 1 ? "block" : "none"
      document.querySelector("#custom-input").style.borderBottomLeftRadius = state === 1 ? "0" : "12px"
      document.querySelector("#custom-input").style.borderBottomRightRadius = state === 1 ? "0" : "12px"
      document.querySelector("#search-in-input").style.borderBottom = state === 1 ? "1px solid #dbdbdb" : null
      document.querySelector("#search-in-input").style.borderBottomRightRadius = state === 1 ? "0" : "12px"
      const input = document.querySelector("#custom-input")
      state === 1 ? input.classList.add("custom-shadow") : input.classList.remove("custom-shadow")

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
      const pointedHTML = `<span id="span1">${firstPart}</span><span id="span2" class="font-bold">${pointedWord}</span><span id="span3">${lastPart}</span>`
      if (type === "name") {
        const href = "/like/" + url + "--" + id
        return `<li class="li-class"><a href=${href} class="custom-dropdown-item"><span style="margin-left: 36px">${pointedHTML} (${year})</span></a></li>`
      } else if (type === "tag") {
        const href = "#"
        return `<li class="li-class"><a href="${href}" class="custom-dropdown-item"><span style="margin-left: 4px">${pointedHTML}</span></a></li>`
      }
    },
    addTag(e) {
      let text = e.target.tagName === "LI" ? e.target.textContent : e.target.parentNode.textContent
      const dataAttribute = text
      const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)]
      text.length > 26 ? text = text.substring(0, 26) + "..." : null

      const tag = `<div class="p-[0.2rem] inline-block" data-innertext="${dataAttribute}">
                        <div class="tag ${randomColor}" >
                            <span>${text}</span>
                            <button type="button" class="delete"><img class="tag-cancel" src="/templates/tag-cancel.svg" alt=""></button>
                        </div>
                    </div>`
      document.querySelector(".tag-result-right-div").innerHTML += tag
      document.querySelector("#custom-input").value = ""
      document.querySelector("#custom-input").focus()
    },
    removeTag(e) {
      e.target.attributes[0].value === "tag-cancel" ? e.target.parentNode.parentNode.parentNode.style.display = "none" : null
      document.querySelector("#custom-input").focus()
    },
    searchByTag() {

      const carts = document.querySelector(".tag-result-right-div").childNodes
      const tags = []

      carts.forEach(e => {
        tags.push(e.attributes[1].value.replaceAll(" ", "_"))
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

input:focus, #series-dropdown, #tags-dropdown {
  box-shadow: 0 1px 6px rgb(32 33 36 / 30%);
}

input:focus ~ #search-in-input:hover {
  border-bottom: 1px solid #dbdbdb;
}

.custom-shadow {
  box-shadow: 0 1px 6px rgb(32 33 36 / 30%);
}

.custom-dropdown-item {
  display: block;
  color: #4A4A4A;
}


.li-class {
  line-height: 36px;
  padding-right: 3px;
  font-size: 14px;
}

.li-class:hover {
  background-color: #efefef;
}

#series-dropdown-ul li:last-child {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

#tag-result-right-div {
  padding: 5px;
}

.tag {
  display: inline-block;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
  position: relative;
  padding: 1px 16px 1px 1px;
}


.t1 {
  font-size: .75rem;
  background-color: #ebfffc;
  color: #00947e;
}

.t2 {
  font-size: .75rem;
  background-color: #eff1fa;
  color: #3850b7;
}

.t3 {
  font-size: .75rem;
  background-color: #eff5fb;
  color: #296fa8;
}

.t4 {
  font-size: .75rem;
  background-color: #effaf5;
  color: #257953;
}

.t5 {
  font-size: .75rem;
  background-color: #fffaeb;
  color: #946c00;
}

.t6 {
  font-size: .75rem;
  background-color: #feecf0;
  color: #cc0f35;
}

.tag-cancel {
  position: absolute;
  top: 2px;
  right: 1px;
}


</style>