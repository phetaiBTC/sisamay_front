import { Api } from "@/plugins/axios"
// import type { ClinicEntity } from "../entity/clinicEntity"
import { useUserStore } from "../store/userStore"
import { message } from "ant-design-vue"
import { storeToRefs } from 'pinia'
import type { IQuery } from "@/shared/interface/query.interface"
import type { IUser } from "../interface"

export const useUser = () => {
    const userStore = useUserStore()
    const { loading, users, query } = storeToRefs(userStore)

    const addUser = async (item: IUser) => {
        try {
            loading.value = true
            await Api.post('/user', item)
            await getAllUser()
            message.success('add success')
        } catch (error: any) {
            message.error(error.response.data.message)
        }
        finally {
            loading.value = false
        }
    }
    const updateUser = async (id: number, item: IUser) => {
        try {
            await Api.patch(`/user/${id}`, item)
            message.success('update success')
            await getAllUser()
        } catch (error: any) {
            message.error(error)
        }
    }
    const getAllUser = async () => {
        try {
            loading.value = true
            const res = await Api.get('/user', {
                params: query.value
            })
            userStore.setData(res.data)
        } catch (error: any) {
            message.error(error)
        }
        finally {
            loading.value = false
        }
    }
    const hardDeleteUser = async (id: number) => {
        try {
            await Api.delete(`/user/hard/${id}`)
            message.success('delete success ' + id)
            await getAllUser()
        } catch (error: any) {
            message.error(error)
        }
    }
    const softDeleteUser = async (id: number) => {
        try {
            await Api.delete(`/user/soft/${id}`)
            message.success('delete success')
            await getAllUser()
        } catch (error: any) {
            message.error(error)
        }
    }
    const restoreUser = async (id: number) => {
        try {
            await Api.patch(`/user/restore/${id}`)
            message.success('restore success')
            await getAllUser()
        } catch (error: any) {
            message.error(error)
        }
    }

    const setQueryUser = (value: IQuery) => {
        query.value = value
    }
    return {
        users,
        loadingUser: loading,
        getAllUser,
        hardDeleteUser,
        softDeleteUser,
        restoreUser,
        setQueryUser,
        addUser,
        updateUser
    }
}   