<template>
  <div>
    <div class="container">

      <div class="columns mt-6" style="height: 100vh">
        <div class="column is-4 is-offset-4">

          <form>
            <input id="custom-input" @input="Typing" class="custom-input">
            <img class="search-custom-svg" src="/templates/searchCustom.svg" alt="">
            <select class="search-in-input">
              <option value="name">Search by Name</option>
              <option value="tag">Search by Tag</option>
            </select>
            <div class="left-border"></div>
            <div class="ghost"></div>
            <div class="series-dropdown"></div>
          </form>


        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  layout: "custom",
  methods: {
    Typing() {
      // const value = document.getElementById("custom-input").value

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
  border: none;
  outline: none;
}

.search-in-input:hover {
  background-color: #dbdbdb;
}

.left-border {
  background-color: #dbdbdb;
  position: absolute;
  width: 1px;
  height: 30px;
  top: 3px;
  left: calc(100% - 117px);
}

.series-dropdown {
  display: none;
  position: absolute;
  /*top: 36px;*/
  height: 360px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgb(32 33 36 / 30%);
  background-color: white;
}

.custom-input:focus {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.custom-input:focus ~ .series-dropdown {
  display: block;
  border-top-left-radius: 0;
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
}

.custom-input:focus ~ .ghost{
  display: block;
}


</style>