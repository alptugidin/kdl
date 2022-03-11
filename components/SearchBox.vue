<template>

  <div>
    <!--    <div id="inputSkeleton" v-if="!svgStatus">-->
    <!--      <b-skeleton height="40"/>-->
    <!--    </div>-->
    <form id="formID">
      <img id="svgSearch" src="/templates/searchCustom.svg" alt="">
      <input id="inputId" class="inp" @input="Search" :placeholder="this.placeholder" autocomplete="off">
      <!--      <select id="searchType" @change="ChangeSearchType" name="" class="has-text-grey-darker has-text-weight-semibold">-->
      <select id="searchType" @change="ChangeSearchType" name="">
        <option value="name">Search by Name</option>
        <option value="tag">Search by Tag</option>
      </select>
      <div id="ghost">
        <div id="innerGhost">
        </div>
      </div>
      <ul id="dropDown" @click="Selection">
      </ul>
      <div id="dropDown2">
        <div class="columns">
          <div class="column p-0" id="resultCol">
            <ul id="dropDown2UL" @click="AddCart"></ul>
            <p id="pInSearchCol2">You can choose tags to multiple</p>
          </div>
          <div class="column p-0" id="searchCol">

            <div @click="RemoveCart" id="cart" class="columns is-centered is-multiline"></div>
            <div id="cart2" class="columns"></div>
          </div>
          <div id="searchCol2" class="column is-narrow">

            <a @click="SearchByTag">
              <span id="searchInnerText" class="has-text-grey-light">Search</span>
            </a>
          </div>
        </div>
      </div>
    </form>

    <!--    <button @click="Random">click</button>-->

  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "SearchBoxV2",
  data() {
    return {
      isMobile: () => window.innerWidth <= 800,
      svgStatus: false,
      searchType: null,
      placeholder: null,
      randomColor: ["is-primary", "is-link", "is-info", "is-success", "is-warning", "is-danger"]
    }
  },

  mounted() {


    this.searchType = "name"
    this.placeholder = "Korean Dramas like..."

    document.getElementById("searchType").addEventListener("change", (e) => {
      if (document.getElementById("searchType").value === "name") {
        this.placeholder = "Korean Dramas like..."
      } else {
        this.placeholder = "e.g. Romance"
      }
    })


    window.addEventListener("click", ((e) => {
      if (!document.getElementById("dropDown").contains(e.target) && !document.getElementById("dropDown2").contains(e.target) && !document.getElementById("colCenter").contains(e.target)) {
        this.NoneEffect("q")
        this.NoneEffect("t")
      }
    }))


  },

  methods: {
    SvgLoadStatus() {
      this.svgStatus = true
      // document.getElementById("inputSkeleton").style.display = "block"
      document.getElementById("formID").style.display = "block"
      this.customWidth = document.getElementById("inputId").offsetWidth.toString() + "px" // ilk açılış için genişlik
      this.ghostWidth = document.getElementById("inputId").offsetWidth.toString() + "px"
    },

    BlockEffect(param) {
      if (param === "t") {
        document.getElementById("dropDown2").style.display = "block"
      } else {
        document.getElementById("dropDown").style.display = "block"
      }
      // document.getElementById("inputId").style.boxShadow= "0 1px 6px rgb(32 33 36 / 28%);"
      document.getElementById("ghost").style.display = "block"
      document.getElementById("inputId").style.borderBottomRightRadius = "0"
      document.getElementById("inputId").style.borderBottomLeftRadius = "0"
      document.getElementById("inputId").style.background = "white"
      // document.getElementById("inputId").style.boxShadow = "0 1px 6px rgb(32 33 36 / 28%);"
      // document.getElementById("inputId").style.borderBottom = "1px solid white"
      document.getElementById("searchType").style.borderBottomRightRadius = "0"
      // document.getElementById("searchType").style.borderBottom = "0"
      console.log("blockEffect")
    },

    NoneEffect(param) {
      if (param === "t") {
        document.getElementById("dropDown2").style.display = "none"
      } else {
        document.getElementById("dropDown").style.display = "none"
      }
      document.getElementById("ghost").style.display = "none"
      document.getElementById("inputId").style.borderBottomRightRadius = "12px"
      document.getElementById("inputId").style.borderBottomLeftRadius = "12px"
      document.getElementById("inputId").style.background = "#E2ECFC"
      // document.getElementById("inputId").style.boxShadow = "0 1px 6px rgb(32 33 36 / 28%);"
      // document.getElementById("inputId").style.borderBottom = "1px solid #dbdbdb"
      document.getElementById("searchType").style.borderBottomRightRadius = "12px"
      // document.getElementById("searchType").style.borderBottom = "1px solid #dbdbdb"
      console.log("none effect")
    },

    Search() {

      const value = document.getElementById("inputId").value
      if (this.searchType === "name") {
        if (value.length > 2) {
          if (this.isMobile()) {
            this.Get("qm", value)
          } else {
            this.Get("q", value)
          }

        } else {
          this.NoneEffect("q")
        }
      } else if (this.searchType === "tag") {
        value.length > 2 ? this.Get("t", value) : document.getElementById("dropDown2UL").innerHTML = ""
      }


    },

    Get(type, value) {
      if (type === "t") { //tag ile arama yapıldığında
        axios.get("/api/tags?q=" + value)
            .then((res) => {
              let tagArray = []
              res.data.forEach(element => {
                tagArray.push(this.PointedWord(element, value, "t"))
              })

              tagArray.length === 0 ? this.NoneEffect("t") : this.BlockEffect("t");
              // document.getElementById("dropDown2").style.display = "block"
              document.getElementById("dropDown2UL").innerHTML = tagArray.join("")
            })
            .catch((err) => {
              console.log("t param error " + err)
            })
      } else {// isim ile arama yapıldığında
        let nameArray = []
        axios.get("/api/series?q=" + value)
            .then((res) => {
              res.data.forEach(element => {
                nameArray.push(this.PointedWord(element, value, type))
              })

              nameArray.length === 0 ? this.NoneEffect("q") : this.BlockEffect("q");
              document.getElementById("dropDown").innerHTML = nameArray.join("")

            })
            .catch((err) => {
              console.log("q param error " + err);
            })
      }


    },

    Selection(e) {

      const seriesName = e.target.parentNode.textContent.substring(0, e.target.parentNode.textContent.length - 7)
      const seriesYear = e.target.parentNode.textContent.substring(e.target.parentNode.textContent.length - 5, e.target.parentNode.textContent.length - 1)
      const url1 = seriesName.replace(/[^a-zA-Z0-9 ]/g, "")
      const url = url1.replace(/ /g, "-")
      let seriesId

      if (e.target.tagName === "SPAN") {
        seriesId = e.target.parentNode.attributes.id.value
      } else {
        seriesId = e.target.attributes.id.value
      }

      document.getElementById("inputId").value = `${seriesName} (${seriesYear})`
      this.NoneEffect("q")
      window.location.href = `/like/${url}--${seriesId}`

    },

    PointedWord(element, value, type) {

      if (type === "t") {
        const firstPos = element.toLowerCase().match(value)["index"]
        const lastPos = element.toLowerCase().match(value)["index"] + value.length
        const pointedWord = element.substring(firstPos, lastPos)
        const firstPart = element.substring(0, firstPos)
        const lastPart = element.substring(lastPos, element.length)
        const pointedHTML = `<span id="span1">${firstPart}</span><span id="span2" class="has-text-weight-bold">${pointedWord}</span><span id="span3">${lastPart}</span>`
        return `<li class="liclass"><a class="dropdownItem has-text-black">${pointedHTML}</a></li>`
      } else {
        const firstPos = element[1].toLowerCase().match(value)["index"]
        const lastPos = element[1].toLowerCase().match(value)["index"] + value.length
        const pointedWord = element[1].substring(firstPos, lastPos)
        const firstPart = element[1].substring(0, firstPos)
        const lastPart = element[1].substring(lastPos, element[1].length)
        const pointedHTML = `<span id="span1">${firstPart}</span><span id="span2" class="has-text-weight-bold">${pointedWord}</span><span id="span3">${lastPart}</span>`
        return `<li class="liclass"><a id= ${element[0]} class="dropdownItem has-text-black" style="padding-left: 35px">${pointedHTML} (${element[2]})</a></li>`
      }


    },

    ChangeSearchType(e) {
      this.searchType = e.target.value
      document.getElementById("inputId").value = ""
      e.target.value === "name" ? this.NoneEffect("t") : this.NoneEffect("q")

    },

    AddCart(e) {
      let text = e.target.tagName === "A" ? e.target.textContent : e.target.parentNode.textContent
      const dataAttribute = text
      text.length > 26 ? text = text.substring(0, 26) + "..." : null
      const randomColor = this.randomColor[Math.floor(Math.random() * this.randomColor.length)]
      const tag = `<div class="column is-narrow p-1" style="display: block"><span data-innertext="${dataAttribute}" style="border: 1px solid #dbdbdb" class="tag ${randomColor} is-light">${text}<button type="button" class="delete is-small"></button></span></div>`
      document.getElementById("inputId").value = ""
      document.getElementById("cart").innerHTML += tag


    },

    RemoveCart(e) {
      e.target.type === "button" ? e.target.parentNode.parentNode.style.display = "none" : null
    },

    SearchByTag() {
      const carts = document.getElementById("cart").childNodes
      const tags = []
      carts.forEach(element => {
        if (element.style.display === "block") {
          tags.push(element.childNodes[0].attributes[0].value.replaceAll(" ", "_"))
        }
      })


      const unique = new Set(tags)
      const query = unique.join("--")
      window.location.href = "/tag/" + query + "?p=1"
    }

  }

}
</script>

<style>
.b-skeleton > .b-skeleton-item.is-rounded {
  border-radius: 12px;
  border: 1px solid #dbdbdb;
}


.inp {
  width: 100%;
  height: 40px;
  border-radius: 12px;
  padding-left: 35px;
  color: #666666;
  border: unset;
  background-color: #E2ECFC;


}

.inp:focus {
  border: 1px solid white;
  background-color: white !important;
  outline: unset;
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
}

.inp:focus + #searchType {
  background-color: white;
  border-left: 1px solid #F2F6FC;
}

.inp:focus + #searchType:hover {
  background-color: #F2F6FC;
}


#searchType {
  background-image: url("/templates/select-svg.svg");
  background-repeat: no-repeat;
  background-position-y: 12px;
  background-position-x: -1px;
  background-size: 20px;
  appearance: none;
  padding-right: 4px;
  padding-left: 18px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  outline: unset;
  position: absolute;
  right: 0;
  height: 40px;
  background-color: #E2ECFC;
  border-left: 1px solid #c9dbf6;
  border-top: unset;
  border-bottom: unset;
  border-right: unset;
  z-index: 20;
  color: gray;
  font-weight: normal;
}

#searchType:hover {
  background-color: #c9dbf6;
  cursor: pointer;
}

#svgSearch {
  position: absolute;
  margin-top: 12px;
  margin-left: 9px;
  width: 16px;
  z-index: 20;

}


form {
  display: block;
  position: relative;
}


#dropDown {
  position: absolute;
  font-size: 14px;
  /*border-left: 1px solid white;*/
  /*border-right: 1px solid white;*/
  /*border-bottom: 1px solid white;*/
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  display: none;
  background-color: white;
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
  z-index: 10;
  width: 100%;
}


.dropdownItem {
  /*height: 30px;*/
  line-height: normal;
  padding: 0.375rem 1rem;
  display: block;
}


.liclass:hover {
  background-color: #F2F6FC;
  height: inherit;
}


.liclass:hover:last-child {
  /*border-bottom-left-radius: 12px;*/
  /*border-bottom-right-radius: 12px ;*/
  border-radius: inherit;
}


#ghost {
  position: absolute;
  margin-top: -5px;
  padding-left: 1px;
  padding-right: 1px;
  display: none;
  z-index: 15;
  /*background-color: #FAFAFA;*/
  background-color: white;
  border-left: 1px solid white;
  border-right: 1px solid white;
  height: 5px;
  width: 100%;
}

#innerGhost {
  /*background-color: red;*/
  position: relative;
  height: 6px;
  z-index: 16;
  width: 100%;
  /*margin-left: 1.5%;*/
  border-bottom: 1px solid #F2F6FC;

}


#dd {
  /*width: 32%;*/
  position: relative;
  top: 0;
}


#icon {
  position: absolute;
  margin-left: 10px;
  margin-top: 12px;
}


/************************************************************************/
#dropDown2 {
  display: none;
  height: 300px;
  position: absolute;
  font-size: 14px;
  /*border-left: 1px solid #dbdbdb;*/
  /*border-right: 1px solid #dbdbdb;*/
  /*border-bottom: 1px solid #dbdbdb;*/
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: white;
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
  z-index: 10;
  width: 100%;
}


#dropDown2:focus > .inp {
  /*box-shadow: 0 1px 6px rgb(32 33 36 / 28%);*/
  outline: 1px solid red !important;
}

#resultCol {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  border-right: 1px solid #dbdbdb;
  overflow: auto;
}

#searchCol {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 270px;
  overflow: auto;
}

#searchCol2 {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 30px;
  width: 50%;
  border-top: 1px solid #dbdbdb;
  transition: .2s;
  border-bottom-right-radius: 15px;
}

#searchCol2:hover {
  background-color: #f1f1f1;
}

#searchCol2:hover #searchInnerText {
  color: #4A4A4A !important;
}

#searchInnerText {
  font-size: 18px;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  text-align: center;
  transition: .2s;

}


::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: #b6b6b6;
  border-radius: 4px;

}

::-webkit-scrollbar-thumb:hover {
  background: #9a9a9a;

}

#cart {
  margin-left: 0;
  margin-top: 5px;
  width: 100%;
}

#pInSearchCol2 {
  position: absolute;
  bottom: 0;
  margin-left: calc(calc(100% - 190px) / 2);
  color: #9a9a9a;
  font-style: italic;
}

@media only screen and (max-width: 768px) {
  #pInSearchCol2 {
    text-align: center;
  }
}

</style>
