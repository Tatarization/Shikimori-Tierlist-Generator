import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store";
import Antd from "ant-design-vue";
import router from "@/router";
// import "ant-design-vue/dist/antd.less";

createApp(App).use(store).use(Antd).use(router).mount("#app");
