import { Api } from "@/plugins/axios"
// import type { ClinicEntity } from "../entity/clinicEntity"
import type { IAttendance } from "../interface"
import { useAttendanceStore } from "../store/attendanceStore"
import { message } from "ant-design-vue"
import { storeToRefs } from 'pinia'
import type { IQuery } from "@/shared/interface/query.interface"

export const useAttendance =  () => {
    const attendanceStore = useAttendanceStore()
    const { loading, attendances, query } = storeToRefs(attendanceStore)

    const addAttendance = async (item: IAttendance) => {
        try {
            loading.value = true
            await Api.post('/attendance', item)
            await getAllAttendance()
            message.success('add success')
        } catch (error: any) {
            message.error(error)
        }
    }

    const getAllAttendance = async () => {
        try {
            loading.value = true
            const res = await Api.get('/attendance', {
                params: query.value
            })
            attendanceStore.setData(res.data)
        } catch (error: any) {
            message.error(error)
        }
        finally {
            loading.value = false
        }
    }
    const hardDeleteAttendance = async (id: number) => {
        try {
            await Api.delete(`/attendance/hard/${id}`)
            message.success('delete success ' + id)
            await getAllAttendance()
        } catch (error: any) {
            message.error(error)
        }
    }
    const softDeleteAttendance = async (id: number) => {
        try {
            await Api.delete(`/attendance/soft/${id}`)
            message.success('delete success')
            await getAllAttendance()
        } catch (error: any) {
            message.error(error)
        }
    }
    const restoreAttendance = async (id: number) => {
        try {
            await Api.patch(`/attendance/restore/${id}`)
            message.success('restore success')
            await getAllAttendance()
        } catch (error: any) {
            message.error(error)
        }
    }
    const updateAttendance = async (id: number, item: IAttendance) => {
        try {
            await Api.patch(`/attendance/${id}`, item)
            message.success('update success')
            await getAllAttendance()
        } catch (error: any) {
            message.error(error)
        }
    }
    const setQuery = (value: IQuery) => {
        query.value = value
    }
    return {
        attendances,
        loadingAttendance: loading,
        addAttendance,
        getAllAttendance,
        hardDeleteAttendance,
        softDeleteAttendance,
        restoreAttendance,
        setQueryEmployee: setQuery,
        updateAttendance
    }
}   