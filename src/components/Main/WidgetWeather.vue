<template>
  <div class="w-weather rounded-xl">
    <div class="cityName">Place Holder</div>
    <div class="temp">30°</div>
    <div class="predicts">Mostly Sunny</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.w-weather {
  height: auto;
  padding: 10px 10px 10px 12px;
  display: grid;
  width: calc(66px / var(--size-divisor));
  margin: 5px;
  background-image: linear-gradient(139.15deg, #e697f3 5.94%, #1fcebc 98.51%);
}

.w-weather .cityName {
  color: rgb(255, 255, 255);
  font-size: calc(10px / var(--size-divisor));
}
.w-weather .temp {
  color: rgb(255, 255, 255);
  font-size: calc(15px / var(--size-divisor));
  padding-left: 5px;
  margin-top: -5px;
}
.w-weather .predicts {
  color: rgb(255, 255, 255);
  font-size: calc(10px / var(--size-divisor));
}
</style>