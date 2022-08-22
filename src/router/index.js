import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/Login.vue";
import store from "../store";

import welcome from "../views/Welcome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "login",
  },
  {
    path: "/",
    redirect: "welcome",
  },
  {
    path: "/welcome",
    name: "welcome",
    component: welcome,
  },  
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["login/token"]) {
        router.push("/login");
      }
      next();
    },
    children: [
      //Ordenes
      {
        path: "/orders",
        name: "orders",
        component: () => import("../components/order/OrderContainer.vue"),
      },

    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
