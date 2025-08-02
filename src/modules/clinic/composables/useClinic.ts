import { Api } from "@/plugins/axios"
// import type { ClinicEntity } from "../entity/clinicEntity"
import type { IClinic } from "../interface"
import { useClinicStore } from "../store/clinicStore"
import { message } from "ant-design-vue"
export const useClinic = () => {
    const clinicStore = useClinicStore()

    const addClinic = async (item: IClinic) => {
        try {
            clinicStore.loading = true
            const res = await Api.post('/clinic', item)
            clinicStore.setData(res.data)
            message.success(res.data.message)
        } catch (error: any) {
            message.error(error)
        }
    }

    const getAllClinic = async () => {
        try {
            clinicStore.loading = true
            const res = await Api.get('/clinic')
            clinicStore.setData(res.data)
        } catch (error: any) {
            message.error(error)
        }
    }
    const hardDelete = async (id: number) => {
        try {
            // const res = await Api.delete(`/clinic/${id}`)
            message.success('delete success ' + id)
        } catch (error: any) {
            message.error(error)
        }
    }
    const softDelete = async (id: number) => {
        try {
            // const res = await Api.delete(`/clinic/${id}`)
            message.success('delete success ' + id)
        } catch (error: any) {
            message.error(error)
        }
    }
    return {
        clinics: clinicStore.data,
        loading: clinicStore.loading,
        addClinic,
        getAllClinic,
        hardDelete,
        softDelete
    }
}   