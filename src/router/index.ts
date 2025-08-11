import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/JobsView.vue"),
        meta: {
          title: "İş İlanları - CareerFlow",
        },
      },

      {
        path: "jobs",
        name: "Jobs",
        component: () => import("@/views/JobsView.vue"),
        meta: {
          title: "İş İlanları - CareerFlow",
        },
      },
      {
        path: "jobs/:id",
        name: "JobDetail",
        component: () => import("@/views/JobDetailView.vue"),
        props: true,
        meta: {
          title: "İş Detayı - CareerFlow",
        },
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/AboutView.vue"),
        meta: {
          title: "Hakkımızda - CareerFlow",
        },
      },
    ],
  },
  {
    // 404 sayfası
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: { template: '<div class="p-4">NotFoundView Sayfası</div>' },
    meta: {
      title: "Sayfa Bulunamadı - CareerFlow",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Global navigation guards
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || "CareerFlow";
  next();
});

export default router;
