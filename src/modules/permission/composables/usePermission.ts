import { Api } from "@/plugins/axios"
import { usePermissionStore } from "../store/permissionStore"
import { message } from "ant-design-vue"
import { storeToRefs } from 'pinia'

export const usePermission = () => {
    const permissionStore = usePermissionStore()
    const { loading, permissions } = storeToRefs(permissionStore)
    const getAllPermission = async () => {
        try {
            loading.value = true
            const res = await Api.get('/permission')
            permissionStore.setData(res.data)
        } catch (error: any) {
            message.error(error)
        }
        finally {
            loading.value = false
        }
    }
    return {
        permissions,
        loadingPermission: loading,
        getAllPermission,
    }
}   