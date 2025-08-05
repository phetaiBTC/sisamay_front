import type { EducationEntity } from "@/modules/education/entity"
import type { Dayjs } from "dayjs"

export interface EmployeeEntity {
    id: number
    name: string
    surname: string
    email: string
    birth_date: string
    gender: 'male' | 'female'
    clinic_id: number
    clinic: string
    district_id: number
    district: string
    distinct_en: string
    province_id: number
    province: string
    province_en: string
    educations: EducationEntity[]
    createdAt: Dayjs
    updatedAt: Dayjs
    deletedAt: Dayjs | null
}