import AiCheckin from "@/auth/AiCheckin.vue";
import CheckinPage from "@/auth/CheckinPage.vue";
import DashboardPage from "@/views/dashboard/DashboardPage.vue";
import HomePage from "@/views/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import StaffLogin from "@/auth/StaffLogin.vue";

const routes = [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/guest-checkin",
      name: "customer-checkin",
      component: CheckinPage
    },
    {
      path: "/staff-login",
      name: "staff-login",
      component: StaffLogin,
      meta: { requiresGuest: true }
    },
    {
      path: "/customer-checkin/customer-automation-checkin",
      name: "customer-automation-checkin",
      component: AiCheckin
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardPage,
      meta: { requiresAuth: true }
    },
    // Legacy routes - redirect to unified dashboard
    {
      path: "/cms/dashboard",
      name: "admin-dashboard",
      redirect: { name: "dashboard" }
    },
    {
      path: "/staff/dashboard",
      name: "staff-dashboard",
      redirect: { name: "dashboard" }
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  // Try to restore session on first load
  if (!authStore.isAuthenticated) {
    authStore.restoreSession();
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // Not authenticated, redirect to staff login
      next({ name: 'staff-login', query: { redirect: to.fullPath } });
    } else {
      // Authenticated, allow access to unified dashboard
      next();
    }
  } else if (to.meta.requiresGuest) {
    // If already authenticated, redirect to unified dashboard
    if (authStore.isAuthenticated) {
      next({ name: 'dashboard' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
