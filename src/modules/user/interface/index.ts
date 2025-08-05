import { tI18n } from "@/shared/utils/i18n";
import type { TableColumnsType } from "ant-design-vue";
import { computed } from "vue";
export interface IUser {
    username: string
    email: string
    password: string
    clinic: number
}

export const columnsUser = computed<TableColumnsType>(() => [
    { title: tI18n('no'), key: 'index', fixed: 'left', width: 70 },
    { title: tI18n('name'), dataIndex: 'username', key: 'name', fixed: 'left' },
    { title: tI18n('email'), key: 'email', dataIndex: 'email' },
    { title: tI18n('clinic'), key: 'clinic', dataIndex: 'clinic' },
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