<template>
  <!-- @page:beforein="openIndicator" @page:afterin="getDataFromServer" -->
  <f7-page>
    <f7-navbar title="Notifications" back-link="Back"></f7-navbar>

    <f7-row>
      <f7-col width="40">
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
      </f7-col>
      <f7-col width="60">
        <f7-block-title>Vehicle Model</f7-block-title>
        <f7-block strong inset>
          <h2>Model: {{ vehicleData.model }}</h2>

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
                  :value="upgrade.size"
                  v-for="upgrade in vehicleUpgradeData.upgradesAvailableForThisVehicle"
                  :key="upgrade.lable"
                  :selected="upgrade.upgraded"
                >
                  {{ upgrade.lable }}
                </option>
              </optgroup>
            </select>
          </f7-list-item>
        </f7-list>
        <f7-block>
          <f7-row>
            <f7-col width="50">
              <f7-button
                fill
                sheet-open=".demo-sheet-swipe-to-close"
                :disabled="vehicleData.plate === ''"
              >
                Show Plate
              </f7-button>
            </f7-col>
            <f7-col width="50">
              <f7-button
                fill
                sheet-open=".demo-sheet-swipe-to-step"
                :disabled="readyToPay !== true"
              >
                Check bill
              </f7-button>
            </f7-col>
          </f7-row>
        </f7-block>
      </f7-col>
    </f7-row>

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
            <img src="../assets/dark.png" />
            <span>{{ this.vehicleData.plate }}</span>
          </div>
        </f7-block>
      </f7-page-content>
    </f7-sheet>
  </f7-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { f7, f7ready } from "framework7-vue";

export default {
  setup() {
    const isLoading = ref(false);
    const load = () => {
      if (isLoading.value) return;
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 4000);
    };

    return {
      isLoading,
      load,
    };
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
      fetch(`https://gta.now.sh/api/vehicles/${model}`)
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

      this.$root.sendNUICB(
        {
          type: "upgradeReq",
          content: {
            selected: this.vehicleUpgradeData.selectedUpdgrades,
            deselected: this.vehicleUpgradeData.deselectedUpdgrades,
            billPrice: this.vehicleData.billPrice,
            metaData: this.appMetaData,
            vehicleData: this.vehicleData,
          },
        },
        "upgradeReq",
        (cb) => {
          this.onPayment = false;
          if (cb == true) {
            this.payColorCode = "green";
            setTimeout(() => {
              this.$root.toggle(); // this should destroy current page
              f7.sheet.close(".demo-sheet-swipe-to-step", true);
              this.payColorCode = "blue";
              f7.views.main.router.back();
            }, 2500);
          }
        },
        (err) => {
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
        }
      );
    },
    testValue() {
      let selectedUpdgrades = f7.smartSelect.get(".smart-select").getValue();
      this.seprateSelectedUpgrades(selectedUpdgrades);
      this.calBillPrice();
    },
    openIndicator() {
      const self = this;
      f7.preloader.show();
      if (process.env.NODE_ENV === "development") {
        f7.preloader.hide();
      }
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
          // this.getImage(this.vehicleData.model);
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
@font-face {
  font-family: "Plate";
  src: url("../fonts/PlatNomorWyVnn.ttf") format("ttf"),
    url("../fonts/PlatNomoreZ2dm.otf") format("opentype");
}
.plate {
  font-family: Plate, "Plate";
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
