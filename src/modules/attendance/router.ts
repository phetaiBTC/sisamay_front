import type { RouteRecordRaw } from 'vue-router';
import Scan from './views/scanComponent.vue';
export const attendanceEmployeeRouter: RouteRecordRaw[] = [
    {
        path: 'attendance-scan',
        name: 'attendance-scan',
        component: Scan
    }
]