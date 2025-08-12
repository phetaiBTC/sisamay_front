import { tI18n } from "@/shared/utils/i18n";
import type { TableColumnsType } from "ant-design-vue";
import { computed } from "vue";

export const columnEducation = computed<TableColumnsType>(() => [
    { title: tI18n('no'), key: 'index', fixed: 'left', width: 70 },
    { title: tI18n('level'), dataIndex: 'level', key: 'level' },
    { title: tI18n('field_of_study'), dataIndex: 'field_of_study', key: 'field_of_study' },
    { title: tI18n('current_occupation'), dataIndex: 'current_occupation', key: 'current_occupation' },
    { title: tI18n('work_experience'), dataIndex: 'work_experience', key: 'work_experience' },
    { title: tI18n('status'), dataIndex: 'status', key: 'status' },
    { title: tI18n('createdAt'), dataIndex: 'createdAt', key: 'createdAt' },
    { title: tI18n('updatedAt'), dataIndex: 'updatedAt', key: 'updatedAt' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 135
    },
])