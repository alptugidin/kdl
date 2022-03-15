<template>

  <nav>
    <div class="container">
      <div class="columns is-vcentered is-multiline">

        <div id="colLeft"
             class="column is-3-tablet is-offset-0-tablet is-2-desktop is-offset-0-desktop is-4-fullhd is-offset-0-fullhd">
          <figure id="headerFigure" class="p-1">
            <a href="/" style="text-decoration: none">
              <img id="headerLogo" src="/templates/bannerV3x64.png" alt="">
            </a>
          </figure>
        </div>
        <div class="dummy"></div>
        <div id="colCenter"
             class="column is-6-tablet is-offset-0-tablet is-5-desktop is-offset-0-desktop is-4-fullhd is-offset-0-fullhd">
          <search-box/>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>

export default {}

</script>


<style>
nav {
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 10;*/
}

#colLeft {
  padding-top: 16px;
}

#headerFigure {
  height: 68px;
}

@media only screen and (max-width: 768px) {
  #headerLogo {
    width: 150px;
    margin-left: calc(calc(100% - 150px) / 2);
  }

  #headerFigure {
    height: unset;
  }

  #colLeft {
    padding-bottom: 0;
  }

  #colCenter {
    padding-top: 5px;
  }

  nav {
    height: 120px;
  }

  body {
    /*margin-top: 134px;*/
  }

}


@media only screen and (min-width: 769px) and (max-width: 1023px) {
  #headerLogo {
    width: 100%;
    margin-top: 2px;
  }

  body {
    /*margin-top: 105px;*/
  }
}


@media only screen and (min-width: 1024px) and (max-width: 1407px) {
  #headerLogo {
    width: 100%;
    margin-top: 6px;
  }

  .dummy {
    width: 12.5%;
  }
}

@media screen and (min-width: 1408px) {
  #headerLogo{
    width: 50%;
  }
}


body {
  /*margin-top: 73px;*/
}

</style>
