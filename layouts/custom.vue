<template>
  <div id="customDiv">
    <headerComp/>
    <Nuxt/>
    <footerComp/>
  </div>
</template>

<script>
import headerComp from "/components/Header"
import footerComp from "/components/Footer"

export default {
  components: {
    headerComp,
    footerComp
  },

  data() {
    return {
      metric: {
        time: new Date().toUTCString(),
        loc: null,
        ip: null,
        lang: null,
        path: null,
        history: {
          search: [],
          select: [],
          card: [],
          page: []
        }
      }
    }
  },

  mounted() {
    this.log()
  },

  methods: {
    log() {

      const path = $nuxt.$route.name
      this.metric.lang = navigator.language
      this.metric.path = $nuxt.$route.fullPath

      fetch('https://www.cloudflare.com/cdn-cgi/trace')
          .then(res => res.text()).then(t => {
        let data = t.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"');
        data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
        const jsondata = JSON.parse(data);
        this.metric.loc = jsondata.loc
        this.metric.ip = jsondata.ip
      })


      if (path === "index") {

        document.getElementById("carousel1").addEventListener("click", e => {
          this.metric.history.card.push(e.target.closest(".custom-card").textContent.trim())
        })

        document.getElementById("carousel2").addEventListener("click", e => {
          this.metric.history.card.push(e.target.closest(".custom-card").textContent.trim())
        })

      } else if (path === "like-like") {
        document.querySelector("#customDiv > div:nth-child(2) > div.container.mx-auto > div.flex.flex-wrap.justify-center.lg\\:gap-14.gap-8.mt-10").addEventListener("click", e => {
          this.metric.history.card = e.target.closest(".custom-card").textContent.trim()
        })

        document.querySelector("#customDiv > div:nth-child(2) > div.container.mx-auto > div.flex.flex-row.justify-center.py-28 > div > div").addEventListener("click", e => {
          this.metric.history.page.push(e.target.textContent)
        })
      } else if (path === "tag-tag") {
        document.querySelector("#customDiv > div:nth-child(2) > div.container.mx-auto.min-h-\\[calc\\(100vh_-_74px\\)\\] > div.flex.flex-wrap.justify-center.lg\\:gap-14.gap-8").addEventListener("click", e => {
          this.metric.history.card = e.target.closest(".custom-card").textContent.trim()
        })
      }


      window.addEventListener("input", e => {
        this.metric.history.search.push(e.target.value)
      })


      document.querySelector("#series-dropdown").addEventListener("click", e => {
        this.metric.history.select.push(e.target.parentNode.textContent.trim())
      })


      window.addEventListener("beforeunload", () => {
        navigator.language !== "tr-TR" ? navigator.sendBeacon("/api/metrics", JSON.stringify(this.metric)) : null
      })

    }
  },


}
</script>
