import type { RouteRecordRaw } from "vue-router";
import indexUser from "./views/index.vue"
export const userRouter: RouteRecordRaw[] = [
    {
        path: '/user',
        name: 'user',
        component: indexUser
    }
]