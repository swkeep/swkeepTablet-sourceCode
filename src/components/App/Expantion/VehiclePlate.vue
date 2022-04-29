<template>
  <div class="">
    <f7-button
      fill
      sheet-open=".demo-sheet-swipe-to-close"
      :disabled="vehicleData.plate === ''"
    >
      Show Plate
    </f7-button>

    <f7-sheet
      class="demo-sheet-swipe-to-close"
      style="height: auto; --f7-sheet-bg-color: #fff"
      swipe-to-close
      backdrop
      v-if="vehicleData.plate !== ''"
    >
      <f7-page-content>
        <f7-block>
          <div class="plate">
            <img src="../../../assets/dark.png" />
            <span>{{ this.vehicleData.plate }}</span>
          </div>
        </f7-block>
      </f7-page-content>
    </f7-sheet>
  </div>
</template>

<script>
export default {
  props: ["vehicleData"],
};
</script>

<style scoped>
@font-face {
  font-family: PlateFont;
  src: url("@/fonts/PlatNomor.ttf") format("truetype"),
    url("@/fonts/PlatNomor.otf") format("OpenType");
}

.plate {
  font-family: PlateFont, "PlateFont";
  height: 8rem;
  width: 16rem;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
}

.plate span {
  font-size: 50px;
  color: white;
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>