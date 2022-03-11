<template>

  <nav>
    <div class="container">
      <div class="columns is-vcentered is-multiline" >
        <div id="colLeft" class="column is-4-desktop is-offset-0-desktop is-6-tablet is-offset-3-tablet ">
<!--        <div id="colLeft" class="column is-4">-->
          <figure id="headerFigure">
            <a  href="/" style="text-decoration: none">
<!--              <img id="headerLogo" src="/templates/bannerV3x64.png" alt="">-->
              <img id="headerLogo" src="/templates/bannerV3x64.png" alt="">
            </a>
          </figure>
        </div>
        <div id="colCenter" class="column is-4-desktop is-offset-0-desktop is-6-tablet is-offset-3-tablet">
<!--        <div id="colCenter" class="column is-4">-->
          <search-box @hook:mounted="Mounted"/>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
// import SearchBox from "@/components/SearchBoxV2";

export default {

  data() {
    return {
      mounted: false
    };
  },
  components: {
    // SearchBox
  },
  methods: {
    Mounted() {
      this.mounted = true;
    }
  }
}

</script>


<style>

nav {
  /*height: 83px !important;*/
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
}

#colLeft {
  /*padding-bottom:10px;*/
  padding-top: 16px;
}

#headerFigure{
  height: 68px;
}

@media only screen and (max-width: 768px) {
  #headerLogo{
    width: 150px;
    margin-left: calc(calc(100% - 150px)/2);
  }

  #headerFigure{
    height: unset;
  }

  #colLeft{
    padding-bottom: 0;
  }

  #colCenter{
    padding-top: 5px;
  }

  nav{
    /*height: 15vh;*/
    height: 130px;
  }

}

@media only screen and (max-width: 1023px){
  #headerLogo{
    width: 180px;
    margin-left: calc(calc(100% - 180px)/2);
  }

  #headerFigure{
    height: unset;
  }
  nav{
    /*height: 19vh;*/
  }

  .inp{
    /*margin-bottom: 10px;*/
  }
}

</style>
