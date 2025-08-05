import { Api } from "@/plugins/axios"
import { useProvinceStore } from "../store/provinceStore"
import { message } from "ant-design-vue"
import { storeToRefs } from 'pinia'

export const useProvince = () => {
    const provinceStore = useProvinceStore()
    const { loading, provinces } = storeToRefs(provinceStore)
    const getAllProvince = async () => {
        try {
            loading.value = true
            const res = await Api.get('/province')
            provinceStore.setData(res.data)
        } catch (error: any) {
            message.error(error)
        }
        finally {
            loading.value = false
        }
    }
    return {
        provinces,
        loadingUser: loading,
        getAllProvince,
    }
}   