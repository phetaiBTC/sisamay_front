import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IPagination } from '@/shared/interface/pagination.interface'
import type { IQuery } from '@/shared/interface/query.interface'
import type { UserEntity } from '../entity'

export const useUserStore = defineStore('user', () => {
    const users = ref<IPagination<UserEntity>>({
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
        sort: 'ASC'
    })
    const loading = ref(false)
    const setData = (item: IPagination<UserEntity>) => {
        users.value = item
        loading.value = false
    }
    return {
        users,
        loading,
        setData,
        query
    }
})
