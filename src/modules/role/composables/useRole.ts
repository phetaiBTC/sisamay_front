import { Api } from "@/plugins/axios"
import { useRoleStore } from "../store/roleStore"
import { message } from "ant-design-vue"
import { storeToRefs } from 'pinia'
import type { IQuery } from "@/shared/interface/query.interface"
import type { IRole } from "../interface"

export const useRole = () => {
    const roleStore = useRoleStore()
    const { loading, roles, query } = storeToRefs(roleStore)

    const addRole = async (item: IRole) => {
        try {
            loading.value = true
            await Api.post('/role', item)
            await getAllRole()
            message.success('add success')
        } catch (error: any) {
            message.error(error.response.data.message)
        }
        finally {
            loading.value = false
        }
    }
    const updateRole = async (id: number, item: IRole) => {
        try {
            await Api.patch(`/role/${id}`, item)
            message.success('update success')
            await getAllRole()
        } catch (error: any) {
            message.error(error)
        }
    }
    const getAllRole = async () => {
        try {
            loading.value = true
            const res = await Api.get('/role', {
                params: query.value
            })
            roleStore.setData(res.data)
        } catch (error: any) {
            message.error(error)
        }
        finally {
            loading.value = false
        }
    }
    const hardDeleteRole = async (id: number) => {
        try {
            await Api.delete(`/role/hard/${id}`)
            message.success('delete success ' + id)
            await getAllRole()
        } catch (error: any) {
            message.error(error)
        }
    }
    const softDeleteRole = async (id: number) => {
        try {
            await Api.delete(`/role/soft/${id}`)
            message.success('delete success')
            await getAllRole()
        } catch (error: any) {
            message.error(error)
        }
    }
    const restoreRole = async (id: number) => {
        try {
            await Api.patch(`/role/restore/${id}`)
            message.success('restore success')
            await getAllRole()
        } catch (error: any) {
            message.error(error)
        }
    }

    const setQueryRole = (value: IQuery) => {
        query.value = value
    }
    return {
        roles,
        loadingRole: loading,
        addRole,
        updateRole,
        getAllRole,
        hardDeleteRole,
        softDeleteRole,
        restoreRole,
        setQueryRole
    }
}   