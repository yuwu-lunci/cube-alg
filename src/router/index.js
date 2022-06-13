import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
//先把VueRouter原型对象的push先保存一份
const originalPush = VueRouter.prototype.push;
//先把VueRouter原型对象的push先保存一份
// const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch((err) => err);
};
// VueRouter.prototype.replace = function (location, resolve, reject) {
//   if (resolve && reject) {
//     originalReplace.call(this, location, resolve, reject);
//   } else {
//     originalReplace.call(
//       this,
//       location,
//       () => {},
//       () => {}
//     );
//   }
// };

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
