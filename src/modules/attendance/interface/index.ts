import { tI18n } from "@/shared/utils/i18n";
import type { TableColumnsType } from "ant-design-vue";
import { computed } from "vue";

export interface IAttendance {
    latitude: number;
    longitude: number;
    accuracy: number;
}


export const columnAttendance = computed<TableColumnsType>(() => [
    { title: tI18n('no'), key: 'index', fixed: 'left', width: 70 },
    { title: tI18n('name'), dataIndex: 'user_username', key: 'name', fixed: 'left' },
    { title: tI18n('email'), dataIndex: 'user_email' },
    { title: tI18n('clinic'), dataIndex: 'clinic_name', width: 130 },
    { title: tI18n('check_in'), dataIndex: 'check_in_time', width: 130 },
    { title: tI18n('check_out'), dataIndex: 'check_out_time', width: 130 },
    { title: tI18n('date'), dataIndex: 'date', width: 130 },
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