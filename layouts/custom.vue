<template>
  <div id="customDiv">
    <headerComp />
    <Nuxt />
    <footerComp />
  </div>
</template>
<style>
html,
body,
#__nuxt,
#__layout,
#customDiv {
  height: 100% !important;
  width: 100% !important;

}
</style>
<script>
import headerComp from "/components/HeaderV2"
import footerComp from "/components/Footer"
export default {
  components: {
    headerComp,
    footerComp
  }
}
</script>
