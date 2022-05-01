<template>
  <f7-page @page:beforein="getAppList">
    <f7-navbar title="About" back-link="Back"></f7-navbar>
    <f7-row>
      <f7-col width="20">
        <f7-list menu-list inset>
          <f7-list-item
            link
            title="Home"
            :selected="selected === 'home'"
            @click="() => (selected = 'home')"
          >
            <template #media>
              <f7-icon
                md="material:home"
                aurora="f7:house_fill"
                ios="f7:house_fill"
              />
            </template>
          </f7-list-item>
          <f7-list-item
            link
            title="Profile"
            :selected="selected === 'profile'"
            @click="() => (selected = 'profile')"
          >
            <template #media>
              <f7-icon
                md="material:person"
                aurora="f7:person_fill"
                ios="f7:person_fill"
              />
            </template>
          </f7-list-item>
          <f7-list-item
            link
            title="Settings"
            :selected="selected === 'settings'"
            @click="() => (selected = 'settings')"
          >
            <template #media>
              <f7-icon
                md="material:settings"
                aurora="f7:gear_alt_fill"
                ios="f7:gear_alt_fill"
              />
            </template>
          </f7-list-item>
        </f7-list>
      </f7-col>
      <f7-col width="80">
        <f7-block v-if="loading == false">
          <div class="app-container">
            <div class="app" v-for="app in appList" :key="app.name">
              <img :src="`./icons/${app.icon}`" />
              <div class="appname">{{ app.lable }}</div>
              <f7-button
                fill
                round
                preloader
                :loading="app.installing"
                data-tooltip="Button tooltip text"
                @click="installApp(app.name)"
                :color="app.instaled ? 'red' : 'blue'"
              >
                {{ app.instaled ? "uninstall" : "install" }}
              </f7-button>
            </div>
          </div>
        </f7-block>
      </f7-col>
    </f7-row>
  </f7-page>
</template>

<script>
import API from "../js/API";
import { f7 } from "framework7-vue";

export default {
  data() {
    return {
      installReqAppName: "",
      loading: false,
      installing: false,
      disableBack: "Back",
      appList: [
        {
          lable: "carrep",
          icon: "carrep.png",
          instaled: false,
          installing: false,
        },
        {
          lable: "calculator",
          icon: "calculator.png",
          instaled: false,
          installing: false,
        },
        {
          lable: "files",
          icon: "files.png",
          instaled: false,
          installing: false,
        },
      ],
    };
  },
  methods: {
    getAppList() {
      // ask server what apps should be here
      // maybe not show apps that reuire a job
      this.loading = true;
      this.openDialog();
      API.post("callbackDispatcher", {
        type: "list",
        content: {
          type: "installationList",
        },
      })
        .then((apps) => {
          this.loading = false;
          this.appList = [];
          apps.forEach((app) => {
            this.appList.push({
              name: app.name,
              lable: app.lable,
              icon: app.icon,
              instaled: app.instaled,
              installing: false,
            });
          });
          this.closeDialog();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    installApp(appname) {
      // send install req to server / name of app
      let appRef = this.getAppRefByName(appname);
      appRef.installing = true;
      API.post("callbackDispatcher", {
        type: "installApp",
        content: {
          appname: appname,
          appRef: appRef,
        },
      })
        .then((e) => {
          console.log(e);
          if (e == "installed") {
            setTimeout(() => {
              this.$root.showNotificationCloseOnClick({
                title: "keepStore",
                subtitle: "installation was successful",
              });
              appRef.installing = false;
            }, 550);
          } else {
            setTimeout(() => {
              this.$root.showNotificationCloseOnClick({
                title: "keepStore",
                subtitle: "uninstallation was successful",
              });
              appRef.installing = false;
            }, 550);
          }
          this.getAppList();
        })
        .catch((err) => {
          appRef.installing = false;
          console.log(err);
        });
    },
    openDialog() {
      f7.dialog.preloader();
    },
    closeDialog() {
      setTimeout(() => {
        f7.dialog.close();
        this.loading = false;
      }, 250);
    },
    getAppRefByName(appname) {
      for (let index = 0; index < this.appList.length; index++) {
        if (this.appList[index].name == appname) {
          return this.appList[index];
        }
      }
      return false;
    },
  },
};
</script>

<style scoped>
.app-container {
  display: grid;
  --auto-grid-min-size: 7rem;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--auto-grid-min-size), 1fr)
  );
  column-gap: 1rem;
  row-gap: 1rem;
}
.app-container .app {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 2px 2px 2px, rgba(0, 0, 0, 0.23) 0px 2px 0px;
}
.app-container :is(img) {
  width: 70px;
  align-self: center;
  margin-top: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.507);
  border-radius: 20px;
}
.app-container .appname {
  align-self: center;
  margin-top: 0.5rem;
  text-transform: capitalize;
  font-weight: 500;
}
.app-container .button {
  width: 70%;
  height: 35px;
  font-size: 12px;
  text-transform: capitalize;
  align-self: center;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}
</style>