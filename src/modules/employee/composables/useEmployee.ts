import { Api } from "@/plugins/axios"
import { useEmployeeStore } from "../store/employeeStore"
import { message } from "ant-design-vue"
import { storeToRefs } from 'pinia'
import type { IQuery } from "@/shared/interface/query.interface"
import type { IEmployee } from "../interface"

export const useEmployee = () => {
    const employeeStore = useEmployeeStore()
    const { loading, employees, query } = storeToRefs(employeeStore)

    const addEmployee = async (item: IEmployee) => {
        try {
            loading.value = true
            await Api.post('/employee', item)
            await getAllEmployee()
            message.success('add success')
        } catch (error: any) {
            message.error(error.response.data.message)
        }
        finally {
            loading.value = false
        }
    }
    const updateEmployee = async (id: number, item: IEmployee) => {
        try {
            await Api.patch(`/employee/${id}`, item)
            message.success('update success')
            await getAllEmployee()
        } catch (error: any) {
            message.error(error)
        }
    }
    const getAllEmployee = async () => {
        try {
            loading.value = true
            const res = await Api.get('/employee', {
                params: query.value
            })
            employeeStore.setData(res.data)
        } catch (error: any) {
            message.error(error)
        }
        finally {
            loading.value = false
        }
    }
    const hardDeleteEmployee = async (id: number) => {
        try {
            await Api.delete(`/employee/hard/${id}`)
            message.success('delete success ' + id)
            await getAllEmployee()
        } catch (error: any) {
            message.error(error)
        }
    }
    const softDeleteEmployee = async (id: number) => {
        try {
            await Api.delete(`/employee/soft/${id}`)
            message.success('delete success')
            await getAllEmployee()
        } catch (error: any) {
            message.error(error)
        }
    }
    const restoreEmployee = async (id: number) => {
        try {
            await Api.patch(`/employee/restore/${id}`)
            message.success('restore success')
            await getAllEmployee()
        } catch (error: any) {
            message.error(error)
        }
    }

    const setQueryEmployee = (value: IQuery) => {
        query.value = value
    }
    return {
        employees,
        loadingEmployee: loading,
        addEmployee,
        updateEmployee,
        getAllEmployee,
        hardDeleteEmployee,
        softDeleteEmployee,
        restoreEmployee,
        setQueryEmployee
    }
}   