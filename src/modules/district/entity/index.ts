import type { ProvinceEntity } from "@/modules/province/entity"

export interface DistrictEntity {
    id: number
    name: string
    name_en: string
    province: ProvinceEntity
}