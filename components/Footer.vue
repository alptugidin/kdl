<template>

  <footer id="footerComp">
    <div class="container">
      <div class="columns is-vcentered my-0" style="height: 117px">
        <div id="footerFirstCol" class="column is-2-desktop is-6-tablet pl-0">
          <!--          <a id="footerHome" class="has-text-weight-semibold is-size-3 is-size-5-mobile" href="/">KDramaLike</a>-->
          <a id="footerHome" class="has-text-weight-semibold is-size-3 is-size-5-mobile" href="/">KDramaLike</a>
          <span class="has-text-weight-semibold  has-text-grey-light"> 2022</span><br>
          <span class="fdash">/ </span><a href="/" class="footerPages">About</a>
          <span class="fdash">/ </span><a href="/privacy" class="footerPages">Privacy</a>
          <span class="fdash">/ </span><a href="/terms" class="footerPages">Terms</a>
        </div>

        <!--        <div id="footerThCol" class="column is-3 is-offset-3 ">-->
        <div id="footerThCol" class="column is-3-desktop is-offset-7-desktop is-4-tablet is-offset-1-tablet">
          <p class="has-text-weight-semibold has-text-grey-lighter">Most popular Korean Dramas;</p>

                    <a href="/populars/Most-popular-Korean-Dramas-2021" class="years">2021</a>
                    <span class="fdash">/</span>
                    <a href="/populars/Most-popular-Korean-Dramas-2020" class="years">2020</a>
                    <span class="fdash">/</span>
                    <a href="/populars/Most-popular-Korean-Dramas-2019" class="years">2019</a>
                    <span class="fdash">/</span>
                    <a href="/populars/Most-popular-Korean-Dramas-2018" class="years">2018</a>
                    <span class="fdash">/</span>
                    <a href="/populars/Most-popular-Korean-Dramas-2017" class="years">2017</a>
                    <span class="fdash">/</span>
                    <a href="/populars/Most-popular-Korean-Dramas-2016" class="years">2016</a>
                    <span class="fdash">/</span>
                    <a href="/populars/Most-popular-Korean-Dramas-2015" class="years">2015</a>
                    <span class="fdash">/</span>
                    <a href="/populars/Most-popular-Korean-Dramas-2014" class="years">2014</a>
                    <span class="fdash">/</span>
                    <a href="/populars/Most-popular-Korean-Dramas-2013" class="years">2013</a>
                    <span class="fdash">/</span>
                    <a href="/populars/Most-popular-Korean-Dramas-2012" class="years">2012</a>
                    <span class="fdash">/</span>
                    <a href="/populars/Most-popular-Korean-Dramas-2011" class="years">2011</a>
                    <span class="fdash">/</span>
                    <a href="/populars/Most-popular-Korean-Dramas-2010" class="years">2010</a>
                    <span class="fdash">/</span><br>


          <a href="/Latest-Korean-Dramas" class="years">Latest Korean Dramas</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
}
</script>

<style>

#footerComp {
  position: relative;
}


.years {
  color: #F5F5F5;

}

.years:hover {
  /*color: #174595;*/
  color: #F5F5F5;
  text-decoration: underline 2px #ffc107;
}


#footerFoCol {
  text-align: left;
}

#footerThCol {
  text-align: left;
  /*margin-top: 8px*/
}


.fdash {
  font-style: normal;
  color: #ffc107;
  font-weight: bold;
}


.footerPages {
  font-size: 1rem;
  color: #F5F5F5;
  /*font-style: italic;*/
}

.footerPages:hover {
  text-decoration: underline #ffc107 2px;
  color: #f5f5f5;
}

#footerSecCol {
  text-align: left;
}

#footerFirstCol {
  text-align: left;
}

#footerThCol {
  text-align: center;
  height: 117px;
}

#footerHome {
  text-decoration: none;
  /*color: #174595;*/
  color: whitesmoke;
  font-family: "Ubuntu", serif;
}

#footerComp {
  background-color: #404040;
  /*border-top: 1px solid #dbdbdb;*/
  height: 117px;
  text-align: center;
  width: 100%;
  bottom: 0;
}

@media only screen and (max-width: 768px) {
  #footerFirstCol {
    text-align: center;
  }

  #footerThCol {
    text-align: center;
  }
}

@media only screen and (max-width: 1023px) {
  #footerFirstCol {
    text-align: center;
  }

  #footerThCol {
    text-align: center;
  }
}


</style>
