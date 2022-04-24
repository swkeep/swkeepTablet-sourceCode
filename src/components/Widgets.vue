<template>
  <div class="widget">
    <div class="row rowLeft">
      <div class="w-clock">
        <div class="clock">{{ hour }}:{{ min }}:{{ sec }}</div>
        <div class="data">{{ date }}</div>
      </div>
    </div>
    <div class="row">
      <div class="w-weather rounded-xl">
        <div class="cityName">Place Holder</div>
        <div class="temp">30°</div>
        <div class="predicts">Mostly Sunny</div>
      </div>
      <div class="w-weather rounded-xl">
        <div class="cityName">Place Holder</div>
        <div class="temp">30°</div>
        <div class="predicts">Mostly Sunny</div>
      </div>
    </div>
    <div class="row">
      <div class="top-stories"></div>
    </div>
    <div class="music"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hour: new Date().getHours(),
      min: new Date().getHours(),
      sec: new Date().getHours(),
      date: new Date().toDateString(),
    };
  },
  mounted() {
    setInterval(() => {
      this.hour = new Date().getHours();
      this.min = new Date().getMinutes();
      this.sec = new Date().getSeconds();
    }, 1000);
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

.w-clock {
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0px;
  margin: 23px;
}
.w-clock .clock {
  font-size: 35px;
  margin-bottom: -10px;
}
.w-clock .data {
  font-size: 14px;
}

.w-weather {
  height: 130px;
  padding: 10px 10px 10px 12px;
  display: grid;
  width: 110px;
  margin: 5px;
  background-image: linear-gradient(139.15deg, #e697f3 5.94%, #1fcebc 98.51%);
}

.w-weather .cityName {
  color: rgb(255, 255, 255);
  font-size: 15px;
}
.w-weather .temp {
  color: rgb(255, 255, 255);
  font-size: 20px;
  padding-left: 5px;
  margin-top: -5px;
}
.w-weather .predicts {
  color: rgb(255, 255, 255);
  font-size: 13px;
}
</style>