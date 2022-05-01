<template>
  <f7-page @page:beforein="getAppList" @page:afterout="menu = []">
    <div class="main-app-screen">
      <div class="apps_holder">
        <widgets></widgets>
        <app-menu :newMenu="menu"></app-menu>
        <dock></dock>
      </div>
    </div>
  </f7-page>
</template>

<script>
import API from "../js/API";
import Dock from "../components/Main/Dock.vue";
import AppMenu from "../components/Main/AppMenu.vue";
import Widgets from "../components/Main/Widgets.vue";

export default {
  components: {
    Dock,
    AppMenu,
    Widgets,
  },
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    getAppList() {
      API.post("callbackDispatcher", {
        type: "list",
        content: {
          type: "installedList",
        },
      })
        .then((applist) => {
          this.menu = [];
          let tmp = [];
          applist.forEach((element) => {
            tmp.push({
              icon: element.icon,
              name: element.name,
              lable: element.lable,
              to: element.to,
              resourceName: element.resourceName,
              readEvent: element.readEvent,
              writeEvent: element.writeEvent,
            });
            this.menu.push({
              icon: element.icon,
              name: element.name,
              lable: element.lable,
              to: element.to,
            });
          });
          this.menu.push({
            icon: "appstore2.png",
            name: "appstore",
            lable: "Appstore",
            to: "store",
          });
          this.$root.globalAppMetaData = tmp;
        })
        .catch((err) => {
          console.log(err);
          this.$root.showNotificationCloseOnClick(err);
        });
    },
  },
  watch: {
    "$root.show": function (value) {
      // update list when we open tablet
      if (value == true) {
        this.getAppList();
      }
    },
  },
};
</script>

<style scoped>
.page {
  background-color: #6390 !important;
}
.apps_holder {
  display: flex;
  margin-top: 30px;
  margin-left: 20px;
}
.main-app-screen {
  display: flex;
  flex-direction: column;
}

.top-stories {
  width: 255px;
}
</style>
