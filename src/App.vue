<template>
  <Transition name="bounce" mode="out-in">
    <div class="tablet-container" v-show="show">
      <div class="tabs-wrapper">
        <div class="screen">
          <Top-Bar />
          <f7-app v-bind="f7params">
            <f7-view url="/" main> </f7-view>
          </f7-app>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
import { f7 } from "framework7-vue";
import TopBar from "./components/Main/TopBar.vue";

import routes from "./js/routes";
import store from "./js/store";

export default {
  data() {
    return {
      show: false,
      globalAppMetaData: [],
    };
  },
  setup() {
    // Framework7 Parameters
    const f7params = {
      name: "swkeep-tablet", // App name
      theme: "aurora", // Automatic theme detection

      // App store
      store: store,
      // App routes
      routes: routes,
    };
    return {
      f7params,
    };
  },
  components: {
    TopBar,
  },
  methods: {
    toggle() {
      this.show = !this.show;
      if (this.show == false) {
        this.sendNUICB(
          {
            type: "close",
          },
          "closeMenu"
        );
      }
    },
    sendNUICB(data = {}, route, cb = () => {}, err = () => {}) {
      fetch(`https://swkeep-tablet/${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => cb(resp))
        .catch((resp) => err(resp));
    },
    showNotificationCloseOnClick(massage) {
      const self = this;
      // Create toast
      if (!self.notificationCloseOnClick) {
        self.notificationCloseOnClick = f7.notification.create({
          icon: '<i class="icon icon-f7"></i>',
          title: massage.title,
          titleRightText: "now",
          subtitle: massage.subtitle,
          closeOnClick: true,
        });
      }
      // Open it
      self.notificationCloseOnClick.open();
      setTimeout(() => {
        self.notificationCloseOnClick.close();
      }, 3500);
    },
  },
  destroyed() {
    window.removeEventListener("message", this.listener);
  },
  mounted() {
    if (process.env.NODE_ENV === "development") {
      this.show = true;
    }
    this.$nextTick(function () {
      var self = this;
      window.addEventListener("message", function (event) {
        switch (event.data.action) {
          case "open":
            self.toggle();
            break;
        }
      });
      document.onkeyup = function (data) {
        if (data.key == "Escape") {
          self.toggle();
        }
        // f7.views.main.router.back();
      };
    });
  },
};
</script>

<style>
* {
  -webkit-font-smoothing: subpixel-antialiased;
}
.row {
  justify-content: center !important;
}
body {
  background: #fff0 !important;
}
:root {
  --size-divisor: 0.75;
}
.framework7-root {
  position: absolute !important;
  top: 25px;
  height: 95.7% !important;
}
.panel-right {
  right: -1px !important;
}
.panel-left {
  left: -1px !important;
}

.bounce-enter-active {
  animation: bounce-in 1s cubic-bezier(0.76, 0, 0.24, 1);
}

.bounce-leave-active {
  animation: bounce-in 1s cubic-bezier(0.76, 0, 0.24, 1) reverse;
}

@keyframes bounce-in {
  100% {
    transform: top ease-in;
    top: 50%;
    box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
  }

  0% {
    transform: top ease-in-out;
    top: 150%;
    box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
  }
}

.tablet-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(calc(-50% - 1px));
}

.tabs-wrapper {
  height: calc(500px / var(--size-divisor)) !important;
  width: calc(694px / var(--size-divisor)) !important;
  margin: 0.5rem !important;
  background-image: url("@/assets/Landscape.png");
  background-size: contain;
}

.tabs-wrapper img {
  max-height: 100%;
  max-width: 100%;
}

.tabs-wrapper .screen {
  position: absolute;
  top: 44px;
  left: 42px;
  right: 44px;
  bottom: 42px;
  border-radius: calc(15px / var(--size-divisor));
  overflow: auto;
}

.screen {
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important; /* Firefox */
  background-color: black;
  background-image: url("@/assets/macOS.jpg");
  background-repeat: round;
}

.page-content {
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important; /* Firefox */
}

.page-content::-webkit-scrollbar {
  display: none;
}

.screen::-webkit-scrollbar {
  display: none !important;
}

.rounded-xl {
  border-radius: calc(10px / var(--size-divisor));
}

.block {
  font-size: 1.01vw;
}
.block-title {
  font-size: 1.1vw;
}

@media (min-width: 630px) and (min-height: 630px) {
  .popup:not(.popup-tablet-fullscreen) {
    border-radius: 0px !important;
  }
}

@media (max-width: 1200px) {
  :root {
    --size-divisor: 0.75;
  }
  .tabs-wrapper .screen {
    border-radius: 10px;
  }
  .framework7-root {
    height: 96% !important;
  }
  .popup:not(.popup-tablet-fullscreen) {
    top: 60% !important;
    height: 90%;
  }
  .c-app__tile {
    width: 35px;
    height: 35px;
  }
}

@media (min-width: 1200px) {
  :root {
    --size-divisor: 0.67;
  }
  .framework7-root {
    height: 96% !important;
  }
  .popup:not(.popup-tablet-fullscreen) {
    top: 60% !important;
    height: 90%;
  }
  .c-app__tile {
    width: 35px;
    height: 35px;
  }
}

@media (min-width: 1600px) {
  :root {
    --size-divisor: 0.69;
  }
  .framework7-root {
    height: 96% !important;
  }

  .popup:not(.popup-tablet-fullscreen) {
    top: 60% !important;
    height: 90%;
  }
  .c-app__tile {
    width: 50px !important;
    height: 50px !important;
  }
}

@media (min-width: 1900px) {
  :root {
    --size-divisor: 0.55;
  }
  .framework7-root {
    height: 96.9% !important;
  }

  .c-app__tile {
    width: 60px !important;
    height: 60px !important;
  }
}
@media (min-width: 2550px) {
  :root {
    --size-divisor: 0.4;
  }
  .screen {
    background-size: cover;
  }
  .framework7-root {
    height: 97.9% !important;
  }
  .c-app__tile {
    width: 95px !important;
    height: 95px !important;
  }
}
</style>