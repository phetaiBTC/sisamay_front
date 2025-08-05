import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DistrictEntity } from '../entity'

export const useDistrictStore = defineStore('district', () => {
    const districts = ref<DistrictEntity[]>([])
    const loading = ref(false)
    const setData = (item: DistrictEntity[]) => {
        districts.value = item
        loading.value = false
    }
    return {
        districts,
        loading,
        setData,
    }
})
