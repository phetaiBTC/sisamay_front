import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PermissionEntity } from '../entity'

export const usePermissionStore = defineStore('permission', () => {
    const permissions = ref<PermissionEntity[]>([])
    const loading = ref(false)
    const setData = (item: PermissionEntity[]) => {
        permissions.value = item
        loading.value = false
    }
    return {
        permissions,
        loading,
        setData,
    }
})
