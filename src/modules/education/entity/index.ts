import type { Dayjs } from "dayjs"

export interface EducationEntity {
    id: number
    level: string
    field_of_study: string
    current_occupation: string
    work_experience: number
    status: 'studying' | 'graduated'
    createdAt: Dayjs
    updatedAt: Dayjs
    deletedAt: Dayjs | null
}   