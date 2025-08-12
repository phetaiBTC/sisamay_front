import type { RouteRecordRaw } from "vue-router";
import EmployeeIndex from './views/index.vue';
import EmployeeDetail from './views/detail.vue';

export const employeeRouter: RouteRecordRaw[] = [
    {
        path: '/employee',
        name: 'employee',
        component: EmployeeIndex
    },
    {
        path: '/employee/:id',
        name: 'employee-detail',
        component: EmployeeDetail
    }

]