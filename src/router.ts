import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { clinicRouter } from "./modules/clinic/router";
import { authRouter } from "./modules/auth/router";
import { userRouter } from "./modules/user/router";
import { authGuard } from "./guards/auth.guard";
import Forbidden from "./views/Forbidden.vue";
import Unauthorized from "./views/unauthorized.vue";
const routes: RouteRecordRaw[] = [
    {
        path: '/forbidden',
        name: 'forbidden',
        component: Forbidden,
        meta: {
            skipAuthCheck: true
        }
    },
    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: Unauthorized,
        meta: {
            skipAuthCheck: true
        }
    },
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
authGuard(router);