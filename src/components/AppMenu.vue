<template>
  <div class="app_menu">
    <div class="o-apps">
      <f7-list-item
        v-for="element in menu"
        :key="element"
        class="c-app__tile rounded-xl"
        :link="element.to"
      >
        <img :src="element.icon" alt="" srcset="" />
        <div class="app_name">{{ element.name }}</div>
      </f7-list-item>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posBoxA: 0,
      posBoxB: 0,
      menu: [
        {
          icon: "./icons/carrep.png",
          name: "RepairCar",
          color: "",
          to: "/about/",
        },
        {
          icon: "./icons/calculator.png",
          name: "Calculator",
          color: "",
          to: "/form/",
        },
        {
          icon: "./icons/clock.png",
          name: "Clock",
          color: "",
          to: "/home/",
        },
        {
          icon: "./icons/files.png",
          name: "Files",
          color: "",
          to: "form",
        },
        {
          icon: "./icons/settings.png",
          name: "Settings",
          color: "",
          to: "/notification/",
        },
        {
          icon: "./icons/settings.png",
          name: "Settings",
          color: "",
          to: "/settings/",
        },
      ],
    };
  },
};
</script>

<style scoped>
.app_menu {
  width: 560px;
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
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.5);
  transition: 0.1s;
}

.c-app__tile:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.app_name {
  color: white;
  font-size: 11px;
  font-family: "myFirstFont", sans-serif;
  text-align: center;
  text-shadow: black 0px 0px 3px;
}
</style>