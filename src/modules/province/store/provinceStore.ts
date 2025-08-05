import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProvinceEntity } from '../entity'

export const useProvinceStore = defineStore('province', () => {
    const provinces = ref<ProvinceEntity[]>([])
    const loading = ref(false)
    const setData = (item: ProvinceEntity[]) => {
        provinces.value = item
        loading.value = false
    }
    return {
        provinces,
        loading,
        setData,
    }
})
