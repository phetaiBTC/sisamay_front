import type { RouteRecordRaw } from 'vue-router';
import AuthIndex from './views/index.vue'
export const authRouter: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component:AuthIndex,
        meta:{
            skipAuthCheck: true
        }
    }
]