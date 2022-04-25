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
  methods: {
    fucousAnimation(e) {
      let previous = e.target.parentNode.parentNode.previousSibling;
      let next = e.target.parentNode.parentNode.nextSibling;
      if (previous.nodeName != "#text") {
        previous.style.transform = "scale(1.1)";
      }
      if (next.nodeName != "#text") {
        next.style.transform = "scale(1.1)";
      }
    },
  },
};
</script>

<style scoped>
.dock {
  height: calc(40px / var(--size-divisor));
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
}
.dock .dock-container {
  padding: 0px 8px 0px 8px;
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.dock .dock-container li {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(35px / var(--size-divisor));
  height: auto;
  vertical-align: bottom;
  transition: 0.2s;
  transform-origin: 50% 100%;
}
.dock .dock-container li:hover {
  margin: 0px 10px 0px 10px;
  padding-bottom: 5px;
  transform: scale(1.25);
  cursor: pointer;
}

.aurora.device-desktop .link:not(.active-state):not(.no-hover):hover {
  opacity: 1 !important;
  transition-duration: 300ms;
}
</style>