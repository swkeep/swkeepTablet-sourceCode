<template>
  <div class="topbarOneTop" :style="background">
    <div class="topbar-container" :class="navbarColors[url]">
      <div class="date">{{ topbarMSG }}</div>
      <div :class="navbarAnimation()"></div>
    </div>
    <div
      class="content"
      :class="navbarColors[url]"
      style="position: absolute; right: 4px; top: 1px"
    >
      <ion-icon name="wifi-outline"></ion-icon>
      <ion-icon name="battery-half-outline"></ion-icon>
    </div>
  </div>
</template>

<script>
import { f7, f7ready } from "framework7-vue";

export default {
  name: "TopBar",
  data: () => ({
    url: "",
    background: "",
    topbarMSG: new Date().toDateString(),
    navbarColors: {
      "/": "top_bar dark",
      "/calculator": "top_bar_animation dark",
      "/about": "top_bar",
      "/app": "top_bar_animation",
    },
  }),
  mounted() {
    f7ready((f7) => {
      this.url = f7.views.main.router.url;
      f7.views.main.on("routeChange", (newRoute) => {
        this.url = newRoute.url;
      });
    });
  },
  methods: {
    navbarAnimation() {
      if (this.url === "/") {
        this.topbarMSG = new Date().toDateString();
        this.background = "background:#6390;";
        return "dummy relocate";
      } else {
        this.background =
          "background-color: var(--f7-navbar-bg-color, var(--f7-bars-bg-color));";
        return "dummy";
      }
    },
  },
};
</script>

<style scoped>
ion-icon {
  font-size: 20px !important;
}
.topbarOneTop {
  z-index: 9999;
  position: relative;
  background-color: white;
  height: 25px;
}

.topbar-container {
  display: flex;
  justify-content: center;
  font-size: 20px;
  padding-right: 3px;
  padding-top: 3px;
}
.content {
  flex: 1;
  max-width: fit-content;
  display: flex;
}

.dummy {
  flex: 0;
  transition: flex 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.relocate {
  flex: auto;
}

.dark {
  color: white !important;
}

.date {
  font-size: 13px;
  display: flex;
  margin-left: 7px;
}
</style>