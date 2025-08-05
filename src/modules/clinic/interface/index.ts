import { tI18n } from "@/shared/utils/i18n";
import type { TableColumnsType } from "ant-design-vue";
import { computed } from "vue";

export interface IClinic {
    id?: number;
    name: string;
    latitude: number;
    longitude: number;
    district: number;
    radius: number;
    start_time_work: string;
    end_time_work: string;
    late_threshold_minutes: number;
}

export const columnsClinic = computed<TableColumnsType>(() => [
    { title: tI18n('no'), key: 'index', fixed: 'left', width: 70 },
    { title: tI18n('name'), dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: tI18n('address'), key: 'address', width: 130 },
    { title: tI18n('district'), dataIndex: 'district' },
    { title: tI18n('province'), dataIndex: 'province' },
    { title: tI18n('radius'), key: 'radius', width: 130 },
    { title: tI18n('time_work'), key: 'time_work' },
    { title: tI18n('late_threshold_minutes'), key: 'late_threshold_minutes' },
    { title: tI18n('employee'), dataIndex: 'employee', key: 'employee' },
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