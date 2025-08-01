import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ClinicEntity } from '../entity/clinicEntity'

export const useClinicStore = defineStore('clinic', () => {
    const data = ref<ClinicEntity[]>([])
    const loading = ref(false)
    const setData = (item: ClinicEntity[]) => {
        data.value = item
        loading.value = false
    }
    return {
        data,
        loading,
        setData
    }
})
