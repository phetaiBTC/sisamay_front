<template>
    <div>
        <base-crud :title="tI18n('clinic')" :columns="columnsClinic" :data="data" :scroll="{ x: 1500, y: 275 }"
            @on-delete="hardDelete($event)" @on-add="open = $event">
            <template #default="{ column, record }">
                <template v-if="column.key === 'employee'">
                    <UsergroupAddOutlined style="font-size: 1.2rem;margin-right: 5px;" />
                    {{ record.employee }}
                </template>
            </template>
        </base-crud>
        <picker-map :open="open" @update:open="open = $event"></picker-map>
    </div>
</template>

<script setup lang="ts">
import BaseCrud from '@/shared/components/BaseCrud/index.vue';
import PickerMap from '../components/PickerMap.vue';
import { tI18n } from '@/shared/utils/i18n';
import { UsergroupAddOutlined } from '@ant-design/icons-vue';
import { columnsClinic } from '../interface';
import { useClinic } from '../composables/useClinic';
import { ref } from 'vue';
const { hardDelete } = useClinic()
const open = ref(true)


interface DataItem {
    id: number
    key: number;
    name: string;
    age: number;
    address: string;
    employee: number;
    createdAt: string;
    updatedAt: string
}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
    data.push({
        id: i,
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
        employee: 10,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
    });
}
</script>

<style scoped></style>