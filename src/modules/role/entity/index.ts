import type { PermissionEntity } from "@/modules/permission/entity"

export interface RoleEntity {
    id: number
    name: string
    display_name: string
    permissions: PermissionEntity[]
}