import { Api } from "@/plugins/axios"
import { useAuthStore } from "../store/authStore"
import { storeToRefs } from 'pinia'
import { message } from "ant-design-vue"
import { router } from "@/router"
import { isAxiosError } from 'axios'

export const useAuth = () => {
    const AuthStore = useAuthStore()
    const { loading } = storeToRefs(AuthStore)

    async function login(email: string, password: string) {
        loading.value = true
        try {
            const res = await Api.post('/auth/login', {
                email,
                password
            })
            message.success('Login success')
            localStorage.setItem('token', res.data.accessToken)
            await router.push({ name: 'clinic' })
        } catch (e: unknown) {
            if (isAxiosError(e)) {
                message.error(e.response?.data?.message || 'Login failed')
            } else if (e instanceof Error) {
                message.error(e.message)
            } else {
                message.error('Unexpected error occurred')
            }
        } finally {
            loading.value = false
        }
    }

    return {
        login,
        loading
    }
}