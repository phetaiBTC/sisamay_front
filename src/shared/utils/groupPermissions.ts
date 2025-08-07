import type { PermissionEntity } from "@/modules/permission/entity"

export function groupPermissions(permissions: PermissionEntity[]) {
    const groups: Record<string, PermissionEntity[]> = {}

    for (const perm of permissions) {
        // ดึงคำสุดท้ายจากชื่อ permission เช่น "create_user" -> "user"
        const parts = perm.name.split('_')
        const groupKey = parts.slice(-1)[0]

        // สร้าง group ถ้ายังไม่มี
        if (!groups[groupKey]) {
            groups[groupKey] = []
        }

        // ใส่ permission เข้า group นั้น
        groups[groupKey].push(perm)
    }

    return groups
}