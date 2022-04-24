<template>
  <div class="dock rounded-xl">
    <div class="dock-container rounded-xl">
      <li class="li-3" v-for="item in menu" :key="item.name">
        <f7-link :href="item.to">
          <img :src="item.icon" alt="" />
        </f7-link>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          icon: "./icons/Landscape.png",
          name: "RepairCar",
          color: "",
          to: "/about/",
        },
        {
          icon: "./icons/notes.png",
          name: "RepairCar",
          color: "",
          to: "http://google.com",
        },
        {
          icon: "./icons/reminders.png",
          name: "RepairCar",
          color: "",
          to: "/about/",
        },
        {
          icon: "./icons/messages.png",
          name: "RepairCar",
          color: "",
          to: "/about/",
        },
        {
          icon: "./icons/facetime.png",
          name: "RepairCar",
          color: "",
          to: "/about/",
        },
        {
          icon: "./icons/appstore.png",
          name: "RepairCar",
          color: "",
          to: "/about/",
        },
        {
          icon: "./icons/safari.png",
          name: "RepairCar",
          color: "",
          to: "/about/",
        },
      ],
    };
  },
};
</script>

<style scoped>
.dock {
  height: 60px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
}
.dock .dock-container {
  padding: 0px 10px 0px 10px;
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(13px);
  -webkit-backdrop-filter: blur(13px);
}

.dock .dock-container li {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  vertical-align: bottom;
  transition: 0.2s;
  transform-origin: 50% 100%;
}
.dock .dock-container li:hover {
  margin: 0px 13px 0px 13px;
  transform: scale(1.15);
  transform: bottom;
  bottom: 15px;
  cursor: pointer;
}
</style>