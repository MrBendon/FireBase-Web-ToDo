import { createApp } from "vue";
import router from "./router.js";
import store from "./store/index.js";
import App from "./App.vue";

// import { VueFire, VueFireDatabaseOptionsAPI } from "vuefire";

//UI
import BaseButton from "./components/UI/BaseButton.vue";
import BaseCard from "./components/UI/BaseCard.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";
import CheckBox from "./components/UI/CheckBox";
import BaseSpinner from "./components/UI/BaseSpinner.vue";

//firebase

const app = createApp(App);
app.use(router);
app.use(store);
// app.use(VueFire, { modules: [VueFireDatabaseOptionsAPI()] });

app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-dialog", BaseDialog);
app.component("check-box", CheckBox);
app.component("base-spinner", BaseSpinner);

app.mount("#app");
