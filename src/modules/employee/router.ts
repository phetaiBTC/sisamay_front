import type { RouteRecordRaw } from "vue-router";
import EmployeeIndex from './views/index.vue'
export const employeeRouter: RouteRecordRaw[] = [
    {
        path: '/employee',
        name: 'employee',
        component: EmployeeIndex
    }
]