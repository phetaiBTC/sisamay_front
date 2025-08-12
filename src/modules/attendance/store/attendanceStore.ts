import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AttendanceEntity } from '../entity'
import type { IPagination } from '@/shared/interface/pagination.interface'
import type { IQuery } from '@/shared/interface/query.interface'

export const useAttendanceStore = defineStore('attendance', () => {
    const attendances = ref<IPagination<AttendanceEntity>>({
        data: [],
        pagination: {
            total: 0,
            count: 0,
            limit: 0,
            totalPages: 0,
            currentPage: 0
        }
    })
    const query = ref<IQuery>({
        page: 1,
        limit: 10,
        search: '',
        is_active: 'active',
        sort: 'ASC',
        type: 'page'
    })
    const loading = ref(false)
    const setData = (item: IPagination<AttendanceEntity>) => {
        attendances.value = item
        loading.value = false
    }
    return {
        attendances,
        loading,
        setData,
        query
    }
})
