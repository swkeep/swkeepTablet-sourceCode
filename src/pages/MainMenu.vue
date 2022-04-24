<template>
  <f7-page>
    <div class="main-app-screen">
      <div class="apps_holder">
        <widgets></widgets>
        <app-menu></app-menu>
        <dock></dock>
      </div>
    </div>
  </f7-page>
</template>

<script>
import Dock from "../components/Dock.vue";
import AppMenu from "../components/AppMenu.vue";
import Widgets from "../components/Widgets.vue";

export default {
  components: {
    Dock,
    AppMenu,
    Widgets,
  },

  methods: {
    calcPosOfBox() {
      // for (const key in this.$refs["centeredDiv"]) {
      //   //console.log(key);
      //   //console.log(this.$refs["centeredDiv"][key].getBoundingClientRect());
      // }
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

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
}

.rowLeft {
  justify-content: left !important;
  margin-left: 42px;
}

.top-stories {
  width: 255px;
}
</style>
