<template>
  <div class="container">
    <div class="columns is-centered">
      <!--      <div class="column is-6 is-offset-3">-->
      <div class="column is-5 pb-0">
        <form class="mt-5">
          <div>
            <font-awesome-icon id="icon" :icon="['fas', 'search']"/>
            <input class="inp" @input="Search" v-model="name" placeholder="Search!">
          </div>
        </form>
        <div class="dropdown-menu" id="dd" role="menu" style="left: unset">
          <div id="dc" class="dropdown-content">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      data: [],
      allData: []

    }
  },
  methods: {

    Search() {

      let nameArray = []
      if (this.name.length > 2) {
        document.getElementById("dd").style.display = "block"
        axios.get("/api", {params: {q: this.name}})
          .then((res) => {
            let count = 0
            res.data.forEach(element => {
              let component = `<a href= "#" class = "dropdown-item">${element.name} (${element.year})</a>`
              nameArray.push(component)
            })
            if (nameArray.length === 0) {
              document.getElementById("dd").style.display = "none"
            } else {
              document.getElementById("dd").style.display = "block"
              document.getElementById("dc").innerHTML = nameArray.join("")
            }
          })
          .catch((err) => {
            console.log("ERR: " + err);
          })
      } else {
        document.getElementById("dd").style.display = "none"
      }
    }
  }

}
</script>


<style>
.inp {
  width: 100% !important;
  height: 40px;
  border-radius: 15px;
  padding-left: 35px;
  font-size: 15px;
  color: #666666;
  border: 1px solid #EFEFEF;
  background-color: #EFEFEF;

}

.inp:focus {
  outline: none;
  background-color: whitesmoke;
}

#dd{
  width: 432px ;
}

#dc{
  border-radius: 15px !important;
}

#icon {
  position: absolute;
  margin-left: 10px;
  margin-top: 12px;
}

</style>
