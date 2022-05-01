<template>
  <div class="topbarOneTop" :style="background">
    <div class="topbar-container" @click="hideOverlay">
      <div class="date" :style="adjust ? 'margin-left: 1rem;' : ''">
        {{ topbarMSG }}
      </div>
      <div :class="navbarAnimation()"></div>
    </div>
    <div class="content icons" ref="ticons">
      <f7-icon f7="battery_25" size="25px"></f7-icon>
      <f7-icon f7="wifi" size="25px"></f7-icon>
    </div>
    <control-center :show="overlay" :hideOverlay="hideOverlay"></control-center>
  </div>
</template>

<script>
// visibility: show;
import { f7, f7ready } from "framework7-vue";
import ControlCenter from "./ControlCenter.vue";

export default {
  name: "TopBar",
  components: {
    ControlCenter,
  },
  data: () => ({
    url: "",
    background: "",
    overlay: false,
    adjust: false,
    iconsLastState: "",
    topbarMSG: new Date().toDateString(),
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
        this.background = "background:#6390; color: white;";
        this.adjust = true;
        return "dummy relocate";
      } else {
        this.background =
          "background-color: var(--f7-navbar-bg-color, var(--f7-bars-bg-color));";
        this.adjust = false;
        return "dummy ";
      }
    },
    hideOverlay() {
      this.overlay = !this.overlay;
      if (this.overlay == true) {
        this.iconsLastState = this.$refs.ticons.className;
        if (this.$refs.ticons.className == "content icons") {
          this.$refs.ticons.className = "content icons dark";
        }
      } else {
        this.$refs.ticons.className = this.iconsLastState;
      }
    },
  },
};
</script>

<style scoped>
.topbarOneTop {
  z-index: 9999;
  position: relative;
  background-color: white;
  height: 28px;
}

.topbar-container {
  display: flex;
  justify-content: center;
  font-size: 20px;
  padding-right: 3px;
  padding-top: 3px;
}

.topbarOneTop .icons {
  position: absolute;
  right: 20px;
  top: 1px;
  gap: 5px;
  z-index: 9999;
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
  font-weight: 500;
}
</style>