<template>
  <f7-button
    fill
    sheet-open=".demo-sheet-swipe-to-step"
    :disabled="readyToPay !== true"
  >
    Check bill
  </f7-button>

  <f7-sheet
    class="demo-sheet-swipe-to-step"
    style="height: auto; --f7-sheet-bg-color: #fff"
    swipe-to-close
    swipe-to-step
    backdrop
    closeByBackdropClick
    v-if="readyToPay === true"
  >
    <div class="sheet-modal-swipe-step">
      <div
        class="
          display-flex
          padding
          justify-content-space-between
          align-items-center
        "
      >
        <div style="font-size: 18px"><b>Total:</b></div>
        <div style="font-size: 22px">
          <b>${{ vehicleUpgradeData.billPrice }}</b>
        </div>
      </div>
      <div class="padding-horizontal padding-bottom">
        <f7-button
          large
          fill
          preloader
          @click="paymentAndUpgrade"
          :color="payColorCode"
          :loading="onPayment"
          :disabled="vehicleUpgradeData.billPrice == 0"
        >
          Make Payment
        </f7-button>
        <div class="margin-top text-align-center">
          Swipe up for more details
        </div>
      </div>
    </div>
    <f7-block-title medium class="margin-top">Your order:</f7-block-title>
    <f7-list no-hairlines>
      <!-- selected Updgrades -->
      <template
        v-for="upgrade in vehicleUpgradeData.selectedUpdgrades"
        :key="upgrade.lable"
      >
        <f7-list-item
          :title="`+${upgrade.lable}`"
          v-if="upgrade.serverSideUpgraded !== true"
        >
          <template #after>
            <b class="text-color-green">${{ upgrade.price }}</b>
          </template>
        </f7-list-item>
      </template>
      <!-- deselected Updgrades -->
      <template
        v-for="upgrade in vehicleUpgradeData.deselectedUpdgrades"
        :key="upgrade.lable"
      >
        <f7-list-item
          :title="`-${upgrade.lable}`"
          v-if="upgrade.serverSideUpgraded === true"
        >
          <template #after>
            <b class="text-color-red">
              ${{ upgrade.price * commissionPercentage }}
            </b>
          </template>
        </f7-list-item>
      </template>
    </f7-list>
  </f7-sheet>
</template>

<script>
export default {
  props: [
    "vehicleUpgradeData",
    "readyToPay",
    "payColorCode",
    "commissionPercentage",
    "onPayment",
    "paymentAndUpgrade",
  ],
};
</script>

<style>
</style>