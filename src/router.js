import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import UserDashboard from "./views/User.vue";
import AdminDashboard from "./views/Admin.vue";
import Payment from "./views/Payment.vue";
import Progress from "./views/Progress.vue";
import Service from "./views/Service.vue";
import About from "./views/About.vue";
import Contact from "./views/Contact.vue";
import Testimoni from "./views/Testimoni.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Review from "./views/Review.vue";
import MultiPaymentCredit from "./views/MultiPaymentCredit.vue";
import MultiPaymentDebit from "./views/MultiPaymentDebit.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/user/dashboard",
      name: "userDashboard",
      component: UserDashboard
    },
    ,
    {
      path: "/user/dashboard/new",
      name: "userDashboardNew",
      component: UserDashboard
    },
    {
      path: "/admin/dashboard",
      name: "adminDashboard",
      component: AdminDashboard
    },
    {
      path: "/payment",
      name: "payment",
      component: Payment
    },
    {
      path: "/progress",
      name: "progress",
      component: Progress
    },
    {
      path: "/service",
      name: "service",
      component: Service
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact
    },
    {
      path: "/testimoni",
      name: "testimoni",
      component: Testimoni
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/review",
      name: "review",
      component: Review
    },
    {
      path: "/multipayment/credit",
      name: "multiPaymentCredit",
      component: MultiPaymentCredit
    },
    {
      path: "/multipayment/debit",
      name: "multiPaymentDebit",
      component: MultiPaymentDebit
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
