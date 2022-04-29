<template>
  <f7-list inset>
    <f7-list-item
      title="Upgrades"
      smart-select
      :smart-select-params="{
        openIn: 'popup',
        searchbar: true,
        searchbarPlaceholder: 'Search updgrades',
      }"
    >
      <select name="Weight" multiple @change="testValue">
        <optgroup label="Trunk size">
          <option
            v-for="upgrade in vehicleUpgradeData.upgradesAvailableForThisVehicle"
            :key="upgrade.lable"
            :value="upgrade.size"
            :selected="upgrade.upgraded"
          >
            {{ upgrade.lable }}
          </option>
        </optgroup>
      </select>
    </f7-list-item>
  </f7-list>
</template>

<script>
export default {
  props: ["vehicleUpgradeData", "testValue"],
};
</script>

<style>
</style>