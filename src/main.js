import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "normalize.css";
import "./assets/css/reset.css";
import getEle from "./plugins";
getEle(Vue);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),

  //利用钩子函数挂载属性
  beforeCreate() {
    Vue.prototype.$bus = this; //安装 全局事件总线 this指向vue原型
  },
}).$mount("#app");
