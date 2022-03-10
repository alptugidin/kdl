<template>
  <div>
    <headerComp/>
    <div id="div403" class="container text-center">
      <div class="columns" style="margin-top: 200px;">
        <div class="column has-text-centered">
          <h1 v-if="error.statusCode === 404" class="title is-1 has-text-weight-bold" style="font-family: Ubuntu, serif; color: #FF3860">404</h1>
          <h1 v-else>error :/</h1>
          <h2 class="subtitle" style="color: #FF3860">Not Found :/</h2>
          <a href="/"><--- Go back to homepage <---</a>
        </div>
      </div>
      <div class="row">
        <div class="col">

        </div>
      </div>
    </div>
    <footerComp/>
  </div>
</template>


<script>
import headerComp from "/components/HeaderV2"
import footerComp from "/components/Footer"


export default {
  props: ['error'],
  layout: 'error', // you can set a custom layout for the error page

  components: {
    headerComp,
    footerComp
  },

};

</script>
<style scoped>
#footerComp {
  position: fixed;
}


</style>
