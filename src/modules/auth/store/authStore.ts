import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const loading = ref(false)
    return {
        loading
    }
})
