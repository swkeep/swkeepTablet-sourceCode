<template>
  <div class="topbarOneTop" :style="background">
    <div
      class="topbar-container"
      :class="navbarColors[url]"
      @click="hideOverlay"
    >
      <div class="date">{{ topbarMSG }}</div>
      <div :class="navbarAnimation()"></div>
    </div>
    <div class="content icons" :class="navbarColors[url]" ref="ticons">
      <f7-icon f7="battery_25" size="25px"></f7-icon>
      <f7-icon f7="wifi" size="25px"></f7-icon>
    </div>
    <transition name="fade">
      <div class="control-center" v-if="overlay" @click="hideOverlay">
        <div class="cc_wrapper" v-if="overlay">
          <div class="control control--1">
            <button class="connectionButton">
              <svg width="23" height="22" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.207 8.831c1.04 0 1.836.82 1.836 1.892 0 1.073-.796 1.893-1.836 1.893h-6.07l-7.423 8.83H4.88l3.997-8.83h-5.92L.612 15.77H0V5.677h.612l2.344 3.154h5.92L4.88 0h1.835l7.424 8.831h6.069z"
                  fill="#FFF"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button class="connectionButton is-active">
              <svg width="27" height="25" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.011 1.768c-1.926 1.553-3.03 3.89-3.03 6.412 0 2.5 1.09 4.826 2.99 6.379a.997.997 0 0 1 .144 1.396.988.988 0 0 1-1.395.145C1.356 14.167 0 11.28 0 8.18 0 5.053 1.374 2.15 3.771.219a.983.983 0 0 1 .728-.213.98.98 0 0 1 .665.367.997.997 0 0 1-.153 1.395zM9.092 4.58a4.582 4.582 0 0 0-1.696 3.591c0 1.401.61 2.703 1.674 3.573a.998.998 0 0 1 .142 1.396.985.985 0 0 1-1.393.145 6.57 6.57 0 0 1-2.404-5.114c0-2.019.889-3.892 2.437-5.14a.974.974 0 0 1 .726-.213c.264.028.5.158.666.366a.998.998 0 0 1-.152 1.396zM22.842.218c2.397 1.933 3.772 4.834 3.772 7.962 0 3.1-1.357 5.988-3.72 7.92a.995.995 0 0 1-.625.222.996.996 0 0 1-.626-1.764c1.9-1.552 2.99-3.878 2.99-6.378 0-2.521-1.104-4.858-3.03-6.413a.997.997 0 0 1-.154-1.395.978.978 0 0 1 .665-.366.983.983 0 0 1 .729.212zm-4.08 2.814c1.548 1.248 2.436 3.122 2.436 5.14a6.569 6.569 0 0 1-2.403 5.113.987.987 0 0 1-1.394-.144.999.999 0 0 1 .143-1.397 4.585 4.585 0 0 0 1.674-3.572 4.585 4.585 0 0 0-1.696-3.59.998.998 0 0 1-.153-1.396.98.98 0 0 1 .666-.366.977.977 0 0 1 .727.212zm-5.455 2.059a2.93 2.93 0 0 1 2.93 2.93c0 1.246-.78 2.303-1.874 2.727v13.155a1.06 1.06 0 0 1-1.056 1.062 1.06 1.06 0 0 1-1.056-1.062V10.748a2.925 2.925 0 0 1 1.056-5.657z"
                  fill="#FFF"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button class="connectionButton connectionButton--blue">
              <svg width="24" height="18" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.842 3.097c3.699 0 7.088 1.292 9.762 3.438a.654.654 0 0 0 .904-.065l1.019-1.132a.671.671 0 0 0-.065-.964C20.288 1.778 16.25 0 11.842 0 7.439 0 3.408 1.772.239 4.36a.671.671 0 0 0-.066.964L1.19 6.457a.654.654 0 0 0 .902.066 15.544 15.544 0 0 1 9.75-3.426zm0 6.108a9.44 9.44 0 0 1 5.676 1.889c.28.208.664.185.896-.073l1.131-1.258c.256-.284.229-.734-.072-.967-2.112-1.64-4.755-2.686-7.631-2.686-2.87 0-5.512 1.043-7.62 2.678a.665.665 0 0 0-.075.966l1.13 1.26c.232.259.617.283.896.074a9.439 9.439 0 0 1 5.669-1.883zm3.654 5.059a.674.674 0 0 0-.125-1.006c-1.014-.681-2.227-1.124-3.53-1.124-1.302 0-2.511.442-3.525 1.12a.673.673 0 0 0-.125 1.006l3.16 3.522a.659.659 0 0 0 .98 0l3.165-3.518z"
                  fill="#FFF"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button class="connectionButton">
              <svg width="15" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.773 20.401V13.43l3.046 3.177c.25.263.242.68-.022.93L8.773 20.4zm3.146-13.26l-3.146 3.031V3.486l3.119 2.688a.645.645 0 0 1 .027.967zm-1.77 4.245l4.664-4.48a.356.356 0 0 0-.004-.522L7.977.186a.712.712 0 0 0-1.19.526v8.876L1.774 4.554a.697.697 0 0 0-.983-.001l-.598.599a.652.652 0 0 0 .014.94l5.624 5.293a.649.649 0 0 1 0 .955L.207 17.633a.652.652 0 0 0-.014.94l.598.598c.27.27.713.27.983-.001l5.013-5.033v9.005c0 .569.673.868 1.096.488l7.006-6.306a.356.356 0 0 0 0-.524l-4.736-4.465a.65.65 0 0 1-.004-.949z"
                  fill="#FFF"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div
            class="control control--3 control--extension control--activated"
          ></div>
          <div class="control control--extension"></div>
          <div class="control control--5"></div>
          <div class="control control--6"></div>
          <div class="control control--7"></div>
          <div class="control control--extension"></div>
          <div class="control control--extension"></div>
          <div class="control control--extension"></div>
          <div class="control control--extension"></div>
          <div class="control control--extension"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// visibility: show;
import { f7, f7ready } from "framework7-vue";

export default {
  name: "TopBar",
  data: () => ({
    url: "",
    background: "",
    overlay: false,
    iconsLastState: "",
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.white-text {
  color: white;
}

.control-center {
  position: absolute;
  height: calc(600px / var(--size-divisor));
  width: 100%;
  background: rgba(0, 0, 0, 0.589);
  backdrop-filter: blur(10px);
  top: 0;
  display: flex;
  flex-direction: column;
  direction: rtl;
}
.control-center .cc_wrapper {
  margin: 35px 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 150px 70px 70px;
  grid-gap: 0.5rem;
  width: 300px;
}
.control {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 18px;
  color: white;
  text-align: center;
  overflow: hidden;
}
.connectionButton.is-active {
  background-color: #4cd964;
}
.connectionButton {
  border-radius: 50%;
  border: 0;
  background-color: #979797;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  transition: background-color 0.125s ease-in-out;
}
.control--1 {
  display: grid;
  grid-gap: 0.85rem;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  grid-column: 1 / span 2;
  padding: 0.75rem;
}

.topbarOneTop {
  z-index: 9999;
  position: relative;
  background-color: white;
  height: 27px;
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
  right: 23px;
  top: 5px;
  gap: 6px;
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
  margin-left: 23px;
  margin-top: 5px;
}
</style>