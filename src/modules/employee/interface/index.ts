import { tI18n } from "@/shared/utils/i18n";
import type { TableColumnsType } from "ant-design-vue";
import type { Dayjs } from "dayjs";
import { computed } from "vue";


export interface IEmployee {
    id?: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    birth_date: Dayjs;
    gender: 'male' | 'female';
    district: number;
    clinic: number;
}

export const columnEmployee = computed<TableColumnsType>(() => [
    { title: tI18n('no'), key: 'index', fixed: 'left', width: 70 },
    { title: tI18n('name'), dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: tI18n('surname'), dataIndex: 'surname', width: 130 },
    { title: tI18n('email'), dataIndex: 'email' },
    { title: tI18n('branch') + ' ' + tI18n('clinic'), dataIndex: 'clinic' },
    { title: tI18n('birth_date'), dataIndex: 'birth_date', width: 130 },
    { title: tI18n('gender'), key: 'gender', width: 100 },
    { title: tI18n('district'), dataIndex: 'district', width: 130 },
    { title: tI18n('province'), dataIndex: 'province', width: 190 },
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