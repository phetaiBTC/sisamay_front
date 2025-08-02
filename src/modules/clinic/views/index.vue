<template>
    <div>
        <base-crud title="clinic" :columns="columnsClinic" :data="data" :scroll="{ x: 1500, y: 240 }"
            @on-hard-delete="hardDelete($event)" @on-soft-delete="softDelete($event)" @on-add="open = $event" @on-change="console.log($event)">
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
import { UsergroupAddOutlined } from '@ant-design/icons-vue';
import { columnsClinic } from '../interface';
import { useClinic } from '../composables/useClinic';
import { ref } from 'vue';
const { hardDelete,softDelete } = useClinic()
const open = ref(false)


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