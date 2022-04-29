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
import Dock from "../components/Main/Dock.vue";
import AppMenu from "../components/Main/AppMenu.vue";
import Widgets from "../components/Main/Widgets.vue";

export default {
  components: {
    Dock,
    AppMenu,
    Widgets,
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
