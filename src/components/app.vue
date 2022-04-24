<template>
  <Transition name="bounce" mode="out-in">
    <div class="tablet-container" v-show="show">
      <div class="tabs-wrapper">
        <div class="screen">
          <Top-Bar />
          <f7-app v-bind="f7params">
            <!-- Left panel with cover effect-->
            <f7-panel left dark>
              <f7-view>
                <f7-page>
                  <f7-navbar title="Left Panel"></f7-navbar>
                  <f7-block>Left panel content goes here</f7-block>
                </f7-page>
              </f7-view>
            </f7-panel>

            <!-- Right panel with reveal effect-->
            <f7-panel right reveal dark>
              <f7-view>
                <f7-page>
                  <f7-navbar title="Right Panel"></f7-navbar>
                  <f7-block>Right panel content goes here</f7-block>
                </f7-page>
              </f7-view>
            </f7-panel>

            <!-- Your main view, should have "view-main" class -->
            <f7-view url="/" main> </f7-view>

            <!-- Popup -->
            <f7-popup id="my-popup">
              <f7-view>
                <f7-page>
                  <f7-navbar title="Popup">
                    <f7-nav-right>
                      <f7-link popup-close>Close</f7-link>
                    </f7-nav-right>
                  </f7-navbar>
                  <f7-block>
                    <p>Popup content goes here.</p>
                  </f7-block>
                </f7-page>
              </f7-view>
            </f7-popup>

            <f7-login-screen id="my-login-screen">
              <f7-view>
                <f7-page login-screen>
                  <f7-login-screen-title>Login</f7-login-screen-title>
                  <f7-list form>
                    <f7-list-input
                      type="text"
                      name="username"
                      placeholder="Your username"
                      v-model:value="username"
                    ></f7-list-input>
                    <f7-list-input
                      type="password"
                      name="password"
                      placeholder="Your password"
                      v-model:value="password"
                    ></f7-list-input>
                  </f7-list>
                  <f7-list>
                    <f7-list-button
                      title="Sign In"
                      @click="alertLoginData"
                    ></f7-list-button>
                    <f7-block-footer>
                      Some text about login information.<br />Click "Sign In" to
                      close Login Screen
                    </f7-block-footer>
                  </f7-list>
                </f7-page>
              </f7-view>
            </f7-login-screen>
          </f7-app>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
import { ref, onMounted } from "vue";
import { f7, f7ready } from "framework7-vue";
import TopBar from "./TopBar.vue";

import routes from "../js/routes.js";
import store from "../js/store";

export default {
  data() {
    return {
      show: false,
    };
  },
  setup() {
    // Framework7 Parameters
    const f7params = {
      name: "My App", // App name
      theme: "auto", // Automatic theme detection

      // App store
      store: store,
      // App routes
      routes: routes,
    };
    // Login screen data
    const username = ref("");
    const password = ref("");

    const alertLoginData = () => {
      f7.dialog.alert(
        "Username: " + username.value + "<br>Password: " + password.value,
        () => {
          f7.loginScreen.close();
        }
      );
    };
    onMounted(() => {
      f7ready(() => {
        // Call F7 APIs here
      });
    });

    return {
      f7params,
      username,
      password,
      alertLoginData,
    };
  },
  components: {
    TopBar,
  },
  methods: {
    doShow() {
      if (this.showTablet === "bounce-enter") {
        this.showTablet = "bounce-leave";
      } else {
        this.showTablet = "bounce-enter";
      }
    },
    toggle(cond) {
      this.show = cond;
      //this.show = !this.show;
    },
  },
  destroyed() {
    window.removeEventListener("message", this.listener);
  },
  mounted() {
    this.listener = window.addEventListener(
      "message",
      (event) => {
        const item = event.data || event.detail;
        if (item.type === "open") {
          this.toggle(true);
        }
        if (item.type === "close") {
          this.toggle(false);
        }
      },
      false
    );
    // document.addEventListener("keypress", (event) => {
    //   if (event.code == "KeyH") {
    //     // do something
    //     this.toggle(true);
    //   }
    // });
  },
};
</script>

<style>
@font-face {
  font-family: myFirstFont;
  src: url("../fonts/SF.otf");
}
body {
  font-family: myFirstFont !important;
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
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
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
  border-radius: 10px;
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

.screen::-webkit-scrollbar {
  display: none !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.rounded-xl {
  border-radius: 25px;
}
</style>