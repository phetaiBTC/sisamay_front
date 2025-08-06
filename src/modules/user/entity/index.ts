import type { PermissionEntity } from "@/modules/permission/entity";
import type { RoleEntity } from "@/modules/role/entity";
import type { Dayjs } from "dayjs"

export interface UserEntity {
    id: number;
    username: string;
    email: string;
    is_verified: boolean;
    clinic_id: number;
    clinic: string;
    avatar: string;
    roles: RoleEntity[];
    permissions: PermissionEntity[];
    createdAt: Dayjs;
    updatedAt: Dayjs;
    deletedAt: Dayjs | null;
}
