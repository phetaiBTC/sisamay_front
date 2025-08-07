import { tI18n } from "@/shared/utils/i18n"
import type { TableColumnsType } from "ant-design-vue"
import { computed } from "vue"

export interface IRole {
    name: string
    display_name: string
    permissions: number[]
}

export const columnRole = computed<TableColumnsType>(() => [
    { title: tI18n('no'), key: 'index', fixed: 'left', width: 70 },
    { title: tI18n('name'), dataIndex: 'name', key: 'name' },
    { title: tI18n('display_name'), dataIndex: 'display_name' },
    { title: tI18n('permission'), dataIndex: 'permissions', key: 'permissions' },
    { title: tI18n('createdAt'), dataIndex: 'createdAt', key: 'createdAt' },
    { title: tI18n('updatedAt'), dataIndex: 'updatedAt', key: 'updatedAt' },
    { title: tI18n('deletedAt'), dataIndex: 'deletedAt', key: 'deletedAt' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 165
    },
])