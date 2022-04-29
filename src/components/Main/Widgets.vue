<template>
  <div class="widget">
    <div class="row">
      <clock></clock>
    </div>
    <div class="row">
      <weather></weather>
      <weather></weather>
    </div>
  </div>
</template>

<script>
import Weather from "./WidgetWeather.vue";
import Clock from "./WidgetClock.vue";

export default {
  components: {
    Weather,
    Clock,
  },
};
</script>

<style scoped>
.widget {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 325px;
  margin: 53px 28px 0px 28px;
}
</style>