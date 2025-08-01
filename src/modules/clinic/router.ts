import type { RouteRecordRaw } from "vue-router";
import indexClinic from "./views/index.vue"
export const clinicRouter: RouteRecordRaw[] = [
    {
        path: '',
        name: 'clinic',
        component: indexClinic
    }
]