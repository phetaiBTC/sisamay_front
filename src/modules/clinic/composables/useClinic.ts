import { Api } from "@/plugins/axios"
// import type { ClinicEntity } from "../entity/clinicEntity"
import type { IClinic } from "../interface"
import { useClinicStore } from "../store/clinicStore"
import { message } from "ant-design-vue"
import { storeToRefs } from 'pinia'
import type { IQuery } from "@/shared/interface/query.interface"

export const useClinic = () => {
    const clinicStore = useClinicStore()
    const { loading, clinics, query } = storeToRefs(clinicStore)

    const addClinic = async (item: IClinic) => {
        try {
            loading.value = true
            await Api.post('/clinic', item)
            await getAllClinic()
            message.success('add success')
        } catch (error: any) {
            message.error(error)
        }
    }

    const getAllClinic = async () => {
        try {
            loading.value = true
            const res = await Api.get('/clinic', {
                params: query.value
            })
            clinicStore.setData(res.data)
        } catch (error: any) {
            message.error(error)
        }
        finally {
            loading.value = false
        }
    }
    const hardDelete = async (id: number) => {
        try {
            await Api.delete(`/clinic/hard/${id}`)
            message.success('delete success ' + id)
            await getAllClinic()
        } catch (error: any) {
            message.error(error)
        }
    }
    const softDelete = async (id: number) => {
        try {
            await Api.delete(`/clinic/soft/${id}`)
            message.success('delete success')
            await getAllClinic()
        } catch (error: any) {
            message.error(error)
        }
    }
    const restore = async (id: number) => {
        try {
            await Api.patch(`/clinic/restore/${id}`)
            message.success('restore success')
            await getAllClinic()
        } catch (error: any) {
            message.error(error)
        }
    }
    const update = async (id: number, item: IClinic) => {
        try {
            await Api.patch(`/clinic/${id}`, item)
            message.success('update success')
            await getAllClinic()
        } catch (error: any) {
            message.error(error)
        }
    }
    const setQuery = (value: IQuery) => {
        query.value = value
    }
    return {
        clinics,
        loading,
        addClinic,
        getAllClinic,
        hardDelete,
        softDelete,
        restore,
        setQuery,
        update
    }
}   