import { tI18n } from "@/shared/utils/i18n";
import type { TableColumnsType } from "ant-design-vue";
import { computed } from "vue";

export interface IClinic {
    id?: number;
    name: string;
    latitude: number;
    longitude: number;
    districtId: number;
}

export const columnsClinic = computed<TableColumnsType>(() => [
    { title: tI18n('no'), dataIndex: 'name', key: 'index', fixed: 'left', width: 70 },
    { title: tI18n('name'), dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: tI18n('address'), dataIndex: 'address', key: 'address' },
    { title: tI18n('employee'), dataIndex: 'employee', key: 'employee' },
    { title: tI18n('createdAt'), dataIndex: 'createdAt', key: 'createdAt' },
    { title: tI18n('updatedAt'), dataIndex: 'updatedAt', key: 'updatedAt' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 165
    },
])