import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { clinicRouter } from "./modules/clinic/router";
import { authRouter } from "./modules/auth/router";
import { userRouter } from "./modules/user/router";
import { authGuard } from "./guards/auth.guard";
import Forbidden from "./views/Forbidden.vue";
import unauthorized from "./views/Unauthorized.vue";
import { employeeRouter } from "./modules/employee/router";
import { RoleRouter } from "./modules/role/router";
import { attendanceEmployeeRouter } from "./modules/attendance/router";
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
        component: unauthorized,
        meta: {
            skipAuthCheck: true
        }
    },
    {
        path: '',
        component: () => import('@/layouts/default.vue'),
        children: [
            ...clinicRouter,
            ...userRouter,
            ...employeeRouter,
            ...RoleRouter
        ]
    },
    {
        path: '/employee-attendance',
        component: () => import('@/layouts/employeeLayout.vue'),
        children: [
            ...attendanceEmployeeRouter
        ]
    },
    ...authRouter,

]
export const router = createRouter({
    history: createWebHistory(),
    routes
})
authGuard(router);