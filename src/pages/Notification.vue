<template>
  <f7-page>
    <f7-navbar title="Notifications" back-link="Back"></f7-navbar>
    <f7-block>
      <p>
        Framework7 comes with simple Notifications component that allows you to
        show some useful messages to user and request basic actions.
      </p>
      <p>
        <f7-button raised @click="showNotificationFull"
          >Full layout notification</f7-button
        >
      </p>
      <p>
        <f7-button raised @click="showNotificationWithButton"
          >With close button</f7-button
        >
      </p>
      <p>
        <f7-button raised @click="showNotificationCloseOnClick"
          >Click to close</f7-button
        >
      </p>
      <p>
        <f7-button raised @click="showNotificationCallbackOnClose"
          >Callback on close</f7-button
        >
      </p>
    </f7-block>
    <f7-list no-hairlines-md>
      <f7-list-input
        label="Name"
        type="text"
        placeholder="Your name"
        clear-button
      ></f7-list-input>

      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        clear-button
      ></f7-list-input>

      <f7-list-input
        label="E-mail"
        type="email"
        placeholder="Your e-mail"
        clear-button
      ></f7-list-input>

      <f7-list-input
        label="URL"
        type="url"
        placeholder="URL"
        clear-button
      ></f7-list-input>
    </f7-list>

    <f7-list>
      <f7-list-item title="Fruit" smart-select>
        <select name="fruits">
          <option value="apple" selected>Apple</option>
          <option value="pineapple">Pineapple</option>
          <option value="pear">Pear</option>
          <option value="orange">Orange</option>
          <option value="melon">Melon</option>
          <option value="peach">Peach</option>
          <option value="banana">Banana</option>
        </select>
      </f7-list-item>
      <f7-list-item
        title="Car"
        smart-select
        :smart-select-params="{
          openIn: 'popup',
          searchbar: true,
          searchbarPlaceholder: 'Search car',
        }"
      >
        <select name="car" multiple>
          <optgroup label="Japanese">
            <option value="honda" selected>Honda</option>
            <option value="lexus">Lexus</option>
            <option value="mazda">Mazda</option>
            <option value="nissan">Nissan</option>
            <option value="toyota">Toyota</option>
          </optgroup>
          <optgroup label="German">
            <option value="audi" selected>Audi</option>
            <option value="bmw">BMW</option>
            <option value="mercedes">Mercedes</option>
            <option value="vw">Volkswagen</option>
            <option value="volvo">Volvo</option>
          </optgroup>
          <optgroup label="American">
            <option value="cadillac">Cadillac</option>
            <option value="chrysler">Chrysler</option>
            <option value="dodge">Dodge</option>
            <option value="ford" selected>Ford</option>
          </optgroup>
        </select>
      </f7-list-item>
      <f7-list-item
        title="Mac or Windows"
        smart-select
        :smart-select-params="{ openIn: 'sheet' }"
      >
        <select name="mac-windows">
          <option value="mac" selected>Mac</option>
          <option value="windows">Windows</option>
        </select>
      </f7-list-item>
      <f7-list-item
        title="Super Hero"
        smart-select
        :smart-select-params="{ openIn: 'popover' }"
      >
        <select name="superhero" multiple>
          <option value="Batman" selected>Batman</option>
          <option value="Superman">Superman</option>
          <option value="Hulk">Hulk</option>
          <option value="Spiderman">Spiderman</option>
          <option value="Ironman">Ironman</option>
          <option value="Thor">Thor</option>
          <option value="Wonder Woman">Wonder Woman</option>
        </select>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
import { f7Navbar, f7Page, f7Block, f7Button, f7 } from "framework7-vue";
export default {
  components: {
    f7Navbar,
    f7Page,
    f7Button,
    f7Block,
  },
  methods: {
    showNotificationFull() {
      const self = this;
      // Create toast
      if (!self.notificationFull) {
        self.notificationFull = f7.notification.create({
          icon: '<i class="icon icon-f7"></i>',
          title: "Framework7",
          titleRightText: "now",
          subtitle: "This is a subtitle",
          text: "This is a simple notification message",
          closeTimeout: 3000,
        });
      }
      // Open it
      self.notificationFull.open();
    },
    showNotificationWithButton() {
      const self = this;
      // Create toast
      if (!self.notificationWithButton) {
        self.notificationWithButton = f7.notification.create({
          icon: '<i class="icon icon-f7"></i>',
          title: "Framework7",
          subtitle: "Notification with close button",
          text: "Click (x) button to close me",
          closeButton: true,
        });
      }
      // Open it
      self.notificationWithButton.open();
    },
    showNotificationCloseOnClick() {
      const self = this;
      // Create toast
      if (!self.notificationCloseOnClick) {
        self.notificationCloseOnClick = f7.notification.create({
          icon: '<i class="icon icon-f7"></i>',
          title: "Framework7",
          titleRightText: "now",
          subtitle: "Notification with close on click",
          text: "Click me to close",
          closeOnClick: true,
        });
      }
      // Open it
      self.notificationCloseOnClick.open();
    },
    showNotificationCallbackOnClose() {
      const self = this;
      // Create toast
      if (!self.notificationCallbackOnClose) {
        self.notificationCallbackOnClose = f7.notification.create({
          icon: '<i class="icon icon-f7"></i>',
          title: "Framework7",
          titleRightText: "now",
          subtitle: "Notification with close on click",
          text: "Click me to close",
          closeOnClick: true,
          on: {
            close() {
              self.$f7.dialog.alert("Notification closed");
            },
          },
        });
      }
      // Open it
      self.notificationCallbackOnClose.open();
    },
  },
  on: {
    pageBeforeOut() {
      const self = this;
      self.$f7.notification.close();
    },
    pageBeforeRemove() {
      const self = this;
      // Destroy toasts when page removed
      if (self.notificationFull) self.notificationFull.destroy();
      if (self.notificationWithButton) self.notificationWithButton.destroy();
      if (self.notificationCloseOnClick)
        self.notificationCloseOnClick.destroy();
      if (self.notificationCallbackOnClose)
        self.notificationCallbackOnClose.destroy();
    },
  },
};
</script>

<style>
.popover-inner {
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}
</style>