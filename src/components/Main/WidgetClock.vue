<template>
  <div class="w-clock">
    <div class="clock">{{ hour }}:{{ min }}:{{ sec }}</div>
    <div class="data">{{ date }}</div>
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
.w-clock {
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0px;
  margin: 23px;
}
.w-clock .clock {
  font-size: calc(25px / var(--size-divisor));
  margin-bottom: -10px;
}
.w-clock .data {
  font-size: 14px;
}
</style>