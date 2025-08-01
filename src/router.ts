import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { clinicRouter } from "./modules/clinic/router";

const routes: RouteRecordRaw[] = [
    {
        path: '',
        component: () => import('@/layouts/default.vue'),
        children: [
            ...clinicRouter
        ]
    }
]
export const router = createRouter({
    history: createWebHistory(),
    routes
})