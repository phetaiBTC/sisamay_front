import { Api } from "@/plugins/axios"
import { useDistrictStore } from "../store/districtStore"
import { message } from "ant-design-vue"
import { storeToRefs } from 'pinia'

export const useDistrict = () => {
    const districtStore = useDistrictStore()
    const { loading, districts } = storeToRefs(districtStore)
    const getAllDistrict = async (id?: number) => {
        try {
            loading.value = true
            const res = await Api.get('/district', {
                params: {
                    id
                }
            })
            districtStore.setData(res.data)
        } catch (error: any) {
            message.error(error)
        }
        finally {
            loading.value = false
        }
    }
    return {
        districts,
        loadingDistrict: loading,
        getAllDistrict,
    }
}   