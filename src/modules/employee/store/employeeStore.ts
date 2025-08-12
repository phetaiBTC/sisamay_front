import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EmployeeEntity } from '../entity'
import type { IPagination } from '@/shared/interface/pagination.interface'
import type { IQuery } from '@/shared/interface/query.interface'

export const useEmployeeStore = defineStore('employee', () => {
    const employees = ref<IPagination<EmployeeEntity>>({
        data: [],
        pagination: {
            total: 0,
            count: 0,
            limit: 0,
            totalPages: 0,
            currentPage: 0
        }
    })
    const employee = ref<EmployeeEntity>()
    const query = ref<IQuery>({
        page: 1,
        limit: 10,
        search: '',
        is_active: 'active',
        sort: 'ASC'
    })
    const loading = ref(false)
    const setData = (item: IPagination<EmployeeEntity>) => {
        employees.value = item
        loading.value = false
    }
    return {
        employees,
        employee,
        loading,
        setData,
        query
    }
})
