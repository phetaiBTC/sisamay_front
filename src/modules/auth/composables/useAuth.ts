import { Api } from "@/plugins/axios"
import { useAuthStore } from "../store/authStore"
import { storeToRefs } from 'pinia'
import { message } from "ant-design-vue"
import { router } from "@/router"

export const useAuth = () => {
    const AuthStore = useAuthStore()
    const { loading } = storeToRefs(AuthStore)

    async function login(email: string, password: string) {
        AuthStore.loading = true
        try {
            const res = await Api.post('/auth/login', {
                email,
                password
            })
            message.success('Login success')
            localStorage.setItem('token', res.data.accessToken)
            await router.push({ name: 'clinic' })
        } catch (e:any) {
            message.error(e)

        } finally {
            AuthStore.loading = false
        }
    }

    return {
        login,
        loading
    }
}