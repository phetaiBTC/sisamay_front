import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { clinicRouter } from "./modules/clinic/router";
import { authRouter } from "./modules/auth/router";
import { userRouter } from "./modules/user/router";

const routes: RouteRecordRaw[] = [
    {
        path: '',
        component: () => import('@/layouts/default.vue'),
        children: [
            ...clinicRouter,
            ...userRouter
        ]
    },
    ...authRouter
]
export const router = createRouter({
    history: createWebHistory(),
    routes
})