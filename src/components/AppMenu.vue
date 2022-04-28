<template>
  <div class="app_menu">
    <div class="o-apps">
      <f7-list-item
        v-for="element in menu"
        :key="element"
        class="c-app__tile rounded-xl"
        :link="`/${element.to}/`"
      >
        <div class="inner_tile">
          <img :src="`./icons/${element.icon}`" alt="" srcset="" />
          <div class="app_name">{{ element.lable }}</div>
        </div>
      </f7-list-item>
    </div>
  </div>
</template>

<script>
export default {
  props: ["toggle"],
  data() {
    return {
      posBoxA: 0,
      posBoxB: 0,
      menu: [
        {
          icon: "calculator.png",
          name: "calculator",
          lable: "Calculator",
          to: "expansion",
        },
        {
          icon: "calculator.png",
          name: "calculator",
          lable: "Calculator",
          to: "form",
        },
        {
          icon: "clock.png",
          name: "clock",
          lable: "Clock",
          to: "home",
        },
        {
          icon: "files.png",
          name: "files",
          lable: "Files",
          to: "form",
        },
        {
          icon: "settings.png",
          name: "settings",
          lable: "Settings",
          to: "notification",
        },
        {
          icon: "settings.png",
          name: "settings",
          lable: "Settings",
          to: "settings",
        },
      ],
    };
  },
  methods: {},
  watch: {
    "$root.show": function (value) {
      if (value == true) {
        // push APPS meta data to menu
        this.$root.sendNUICB(
          {
            type: "getAppList",
          },
          "getAppList",
          (applist) => {
            if (process.env.NODE_ENV === "development") {
            } else {
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
              this.$root.globalAppMetaData = tmp;
            }
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.app_menu {
  width: calc(455px / var(--size-divisor));
  margin-top: 30px;
}

.o-apps {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
.o-apps > * {
  margin: 0 30px 60px;
}

.c-app__tile {
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  transition: 0.1s;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.inner_tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.c-app__tile:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.2s ease-in-out;
}

.app_name {
  color: white;
  font-size: 11px;
  font-family: "myFirstFont", sans-serif;
  text-align: center;
  text-shadow: black 0px 1px 5px;
}
</style>