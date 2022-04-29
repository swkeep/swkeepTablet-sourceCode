<template>
  <!-- @page:beforein="openIndicator" @page:afterin="getDataFromServer" -->
  <f7-page>
    <f7-navbar title="Notifications" back-link="Back"></f7-navbar>

    <f7-row>
      <f7-col width="40">
        <owner-information
          :vehicleData="vehicleData"
          :onWantToGetVehicle="onWantToGetVehicle"
          :colorCode="colorCode"
          :getDataFromServer="getDataFromServer"
        ></owner-information>
      </f7-col>
      <f7-col width="60">
        <vehicle-infromation :vehicleData="vehicleData"></vehicle-infromation>
        <vehicle-upgrade-list
          :vehicleUpgradeData="vehicleUpgradeData"
          :showSwiper="showSwiper"
          :testValue="testValue"
        ></vehicle-upgrade-list>
        <f7-block>
          <f7-row class="row-justbet">
            <f7-col width="40">
              <vehicle-plate :vehicleData="vehicleData"></vehicle-plate>
            </f7-col>
            <f7-col width="40">
              <upgrade-bill
                :vehicleUpgradeData="vehicleUpgradeData"
                :readyToPay="readyToPay"
                :payColorCode="payColorCode"
                :paymentAndUpgrade="paymentAndUpgrade"
                :onPayment="onPayment"
                :commissionPercentage="commissionPercentage"
              ></upgrade-bill>
            </f7-col>
          </f7-row>
        </f7-block>
      </f7-col>
    </f7-row>
  </f7-page>
</template>

<script>
import API from "../js/API";
import { f7 } from "framework7-vue";
import OwnerInformation from "../components/App/Expantion/OwnerInformation.vue";
import VehicleInfromation from "../components/App/Expantion/VehicleInfromation.vue";
import VehicleUpgradeList from "../components/App/Expantion/VehicleUpgradeList.vue";
import VehiclePlate from "../components/App/Expantion/VehiclePlate.vue";
import UpgradeBill from "../components/App/Expantion/UpgradeBill.vue";

export default {
  components: {
    OwnerInformation,
    VehicleInfromation,
    VehicleUpgradeList,
    VehiclePlate,
    UpgradeBill,
  },
  data() {
    if (process.env.NODE_ENV === "development") {
      return {
        appName: "expansiontrunk",
        vehicleData: {
          ownerID: "1",
          personalInfo: {
            firstname: "aru",
            lastname: "sadasd",
            phone: "4565465498",
            gender: "Male",
            birthdate: "5424/6/4",
          },
          model: "akuma",
          images: [],
          plate: "1464SAD",
          hash: "sadsad",
        },
        vehicleUpgradeData: {
          upgradesAvailableForThisVehicle: [
            { lable: "20 kg", size: 20, price: 200, upgraded: false },
            { lable: "30 kg", size: 30, price: 500, upgraded: true },
            { lable: "50 kg", size: 50, price: 1000, upgraded: false },
            { lable: "75 kg", size: 75, price: 2000, upgraded: true },
          ],
          currentSize: 50,
          maxUpgradeSize: 150,
          selectedUpdgrades: [],
          deselectedUpdgrades: [],
          billPrice: 0,
        },
        onPayment: false,
        onWantToGetVehicle: false,
        colorCode: "blue",
        payColorCode: "blue",
        readyToPay: false,
        showSwiper: false,
        commissionPercentage: 0.2,
      };
    } else {
      return {
        appName: "expansiontrunk",
        vehicleData: {
          ownerID: "",
          personalInfo: {
            firstname: "",
            lastname: "",
            phone: "",
            gender: "",
            birthdate: "",
          },
          model: "",
          images: [],
          plate: "",
          hash: "",
        },
        vehicleUpgradeData: {
          upgradesAvailableForThisVehicle: [],
          currentSize: 0,
          maxUpgradeSize: 0,
          selectedUpdgrades: [],
          deselectedUpdgrades: [],
          billPrice: 0,
        },
        onPayment: false,
        onWantToGetVehicle: false,
        colorCode: "blue",
        payColorCode: "blue",
        readyToPay: false,
        showSwiper: false,
        commissionPercentage: 0.2,
        appMetaData: [],
      };
    }
  },
  methods: {
    getImage(model) {
      // later if we have api to get images
      fetch(``)
        .then((response) => response.json())
        .then((data) => {
          let tmp = [];
          Object.keys(data.images).forEach((key) => {
            tmp.push(data.images[key]);
          });
          this.vehicleData.images = tmp;
          this.showSwiper = true;
        })
        .catch(() => {
          this.vehicleData.images = [];
          this.showSwiper = false;
        });
    },
    getCurrentPageMetaData() {
      this.$root.globalAppMetaData.forEach((element) => {
        if (element.name == this.appName) {
          this.appMetaData = element;
        }
      });
    },
    seprateSelectedUpgrades(selectedUpdgrades) {
      let tmp = [];
      let tmp2 = [];
      let serveRes = this.vehicleUpgradeData.upgradesAvailableForThisVehicle;
      serveRes.forEach((element, index) => {
        let find = selectedUpdgrades.findIndex((e) => e == element.size);
        if (find === -1) {
          tmp2.push({
            lable: element.lable,
            size: element.size,
            price: element.price,
            serverSideUpgraded: element.upgraded,
          });
        } else {
          tmp.push({
            lable: element.lable,
            size: element.size,
            price: element.price,
            serverSideUpgraded: element.upgraded,
          });
        }
      });

      this.vehicleUpgradeData.selectedUpdgrades = tmp;
      this.vehicleUpgradeData.deselectedUpdgrades = tmp2;
      if (tmp.length != 0 || tmp2.length != 0) {
        this.readyToPay = true;
      } else {
        this.readyToPay = false;
      }
    },
    calBillPrice() {
      let selectList = this.vehicleUpgradeData.selectedUpdgrades;
      let deselectList = this.vehicleUpgradeData.deselectedUpdgrades;

      let price = 0;
      selectList.forEach((element) => {
        if (element.serverSideUpgraded === false) {
          price += element.price;
        }
      });
      deselectList.forEach((element) => {
        if (element.serverSideUpgraded === true) {
          price += element.price * this.commissionPercentage;
        }
      });
      this.vehicleUpgradeData.billPrice = price;
    },
    paymentAndUpgrade() {
      this.getCurrentPageMetaData();
      this.onPayment = true;

      API.post("upgradeReq", {
        type: "upgradeReq",
        content: {
          selected: this.vehicleUpgradeData.selectedUpdgrades,
          deselected: this.vehicleUpgradeData.deselectedUpdgrades,
          billPrice: this.vehicleData.billPrice,
          metaData: this.appMetaData,
          vehicleData: this.vehicleData,
        },
      })
        .then((res) => {
          this.onPayment = false;
          if (res == true) {
            this.payColorCode = "green";
            setTimeout(() => {
              this.$root.toggle(); // this should destroy current page
              f7.sheet.close(".demo-sheet-swipe-to-step", true);
              this.payColorCode = "blue";
              f7.views.main.router.back();
            }, 2500);
          }
        })
        .catch((err) => {
          this.onPayment = false;
          this.payColorCode = "red";
          this.$root.showNotificationCloseOnClick({
            title: "network error",
            subtitle: err,
          });
          setTimeout(() => {
            this.payColorCode = "blue";
            f7.sheet.close(".demo-sheet-swipe-to-step", true);
          }, 2500);
        });
    },
    testValue() {
      let selectedUpdgrades = f7.smartSelect.get(".smart-select").getValue();
      this.seprateSelectedUpgrades(selectedUpdgrades);
      this.calBillPrice();
    },
    getDataFromServer() {
      this.getCurrentPageMetaData();
      this.onWantToGetVehicle = true;
      this.$root.sendNUICB(
        {
          type: "openApp",
          content: {
            appName: this.appName,
            metaData: this.appMetaData,
          },
        },
        "openApp",
        (appInitData) => {
          this.onWantToGetVehicle = false;
          // f7.preloader.hide();
          this.vehicleData = {
            personalInfo: appInitData.vehicleData.personalInfo,
            ownerID: appInitData.vehicleData.ownerID,
            model: appInitData.vehicleData.model,
            plate: appInitData.vehicleData.plate,
            hash: appInitData.vehicleData.hash,
          };
          this.vehicleUpgradeData = {
            // { lable: "20 kg", size: 20, price: 200, upgraded: false },
            upgradesAvailableForThisVehicle:
              appInitData.vehicleUpgradeData.upgradesAvailableForThisVehicle,
            currentSize: appInitData.vehicleUpgradeData.currentSize,
            maxUpgradeSize: appInitData.vehicleUpgradeData.maxUpgradeSize,
          };
        },
        (err) => {
          this.onWantToGetVehicle = false;
          this.$root.showNotificationCloseOnClick({
            title: "Error",
            subtitle: err,
          });
          this.colorCode = "red";
          setTimeout(() => {
            this.colorCode = "blue";
          }, 2500);
        }
      );
    },
  },
};
</script>

<style scoped>
.row-justbet {
  justify-content: space-between !important;
}
</style>
