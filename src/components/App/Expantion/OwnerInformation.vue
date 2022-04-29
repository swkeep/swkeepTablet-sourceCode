<template>
  <f7-block strong inset>
    <f7-block-title>Owner infromation</f7-block-title>
    <f7-list inline-labels no-hairlines-md>
      <!-- vehicle Data / Left col -->
      <f7-list-input
        label="Name"
        type="text"
        placeholder="Your name"
        disabled
        :value="`${vehicleData.personalInfo.firstname} ${vehicleData.personalInfo.lastname}`"
      >
      </f7-list-input>
      <f7-list-input
        label="Owner ID"
        type="tel"
        placeholder="Owner ID number"
        :value="vehicleData.ownerID"
      >
        <f7-icon icon="demo-list-icon"></f7-icon>
      </f7-list-input>
      <f7-list-input
        label="Phone"
        type="tel"
        placeholder="Owner phone number"
        :value="vehicleData.personalInfo.phone"
      >
        <f7-icon icon="demo-list-icon"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Gender"
        type="text"
        :value="vehicleData.personalInfo.gender ? 'Female' : 'Male'"
        disabled
      >
        <f7-icon icon="demo-list-icon"></f7-icon>
      </f7-list-input>

      <f7-list-input
        label="Birthdate"
        type="text"
        :value="vehicleData.personalInfo.birthdate"
        disabled
      >
        <f7-icon icon="demo-list-icon"></f7-icon>
      </f7-list-input>
    </f7-list>
    <f7-button
      fill
      preloader
      :loading="onWantToGetVehicle"
      :color="colorCode"
      @click="getDataFromServer"
    >
      Get nearby vehicle
    </f7-button>
  </f7-block>
</template>

<script>
export default {
  props: [
    "vehicleData",
    "onWantToGetVehicle",
    "colorCode",
    "getDataFromServer",
  ],
};
</script>

<style>
</style>