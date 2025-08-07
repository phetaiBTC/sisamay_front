import type { RouteRecordRaw } from "vue-router";
import RoleIndex from "./views/index.vue";
export const RoleRouter: RouteRecordRaw[] = [
    {
        path: '/role',
        name: 'role',
        component: RoleIndex
    }
]