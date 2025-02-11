import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/presentation/store/auth.store";
import { UserRole } from "./domain/enums/UserRole";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/presentation/views/auth/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/student",
    component: () => import("@/presentation/views/student/DashboardView.vue"),
    meta: { requiresAuth: true, role: UserRole.STUDENT },
  },
  {
    path: "/teacher",
    component: () => import("@/presentation/views/teacher/DashboardView.vue"),
    meta: { requiresAuth: true, role: UserRole.TEACHER },
  },
  {
    path: "/teacher/add-grade",
    component: () =>
      import("@/presentation/views/teacher/grade/CreateGrade.vue"),
    meta: { requiresAuth: true, role: UserRole.TEACHER },
  },
  {
    path: "/storage/add",
    component: () => import("@/presentation/views/storage/CreateStorage.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.currentUser) {
    await authStore.initialize();
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiredRole = to.meta.role;

  if (authStore.currentUser && to.path === "/login") {
    const role = authStore.currentUser.role;
    next(role === UserRole.STUDENT ? "/student" : "/teacher");
    return;
  }

  if (requiresAuth && !authStore.currentUser) {
    next("/login");
  } else if (requiredRole && authStore.currentUser?.role !== requiredRole) {
    next("/login");
  } else {
    next();
  }
});

export default router;
