<template>
  <f7-block-title>Vehicle Model</f7-block-title>
  <f7-block strong inset>
    <h2>{{ vehicleData.model }}</h2>

    <f7-swiper pagination navigation scrollbar v-if="showSwiper == true">
      <f7-swiper-slide
        v-for="image in vehicleData.images"
        :key="image"
        style="justify-content: center; display: flex"
      >
        <img :src="image" alt="" srcset="" />
      </f7-swiper-slide>
    </f7-swiper>
  </f7-block>
</template>

<script>
export default {
  props: ["vehicleData", "showSwiper"],
};
</script>

<style scoped>
h2 {
  font-weight: 400;
  text-align: center;
  text-transform: capitalize;
}
</style>