<template>
    <div>
        <base-crud :loading="loading" title="clinic" :columns="columnsClinic" :data="clinics.data"
            :scroll="{ x: 2000, y: 290 }" @on-hard-delete="hardDelete($event)" @on-soft-delete="softDelete($event)"
            @on-add="create" @on-change="onChange($event)" @on-restore="restore($event)"
            :pagination="clinics.pagination" @on-edit="edit($event)">
            <template #default="{ column, record }">
                <template v-if="column.key === 'employee'">
                    <UsergroupAddOutlined style="font-size: 1.2rem;margin-right: 5px;" />
                    {{ record.employeeCount + record.userCount }}
                </template>
                <template v-if="column.key === 'address'">
                    <div style="display: flex;align-items: center;">
                        <a :href="`https://www.google.com/maps/search/?api=1&query=${record.latitude},${record.longitude}`"
                            target="_blank">
                            <EnvironmentTwoTone two-tone-color="red" style="font-size: 2rem;margin-right: 10px;" />
                        </a>
                        {{ $t('address') }}
                    </div>
                </template>
                <template v-if="column.key === 'radius'">
                    {{ record.radius }} {{ $t('m') }}
                </template>
                <template v-if="column.key === 'time_work'">
                    {{ record.start_time_work }} - {{ record.end_time_work }}
                </template>
                <template v-if="column.key === 'late_threshold_minutes'">
                    {{ record.late_threshold_minutes }} {{ $t('mn') }}
                </template>
            </template>
        </base-crud>
        <picker-map :open="open" @update:open="open = $event" :data="record" :mode="mode"></picker-map>
    </div>
</template>

<script setup lang="ts">
import BaseCrud from '@/shared/components/BaseCrud/index.vue';
import PickerMap from '../components/PickerMap.vue';
import { EnvironmentTwoTone, UsergroupAddOutlined } from '@ant-design/icons-vue';
import { columnsClinic } from '../interface';
import { useClinic } from '../composables/useClinic';
import { onMounted, ref } from 'vue';
import type { IQuery } from '@/shared/interface/query.interface';
import type { ClinicEntity } from '../entity/clinicEntity';

const { hardDelete, softDelete, loading, getAllClinic, clinics, restore, setQuery } = useClinic()
const mode = ref<'create' | 'edit'>('create')
const open = ref(false)
const record = ref<ClinicEntity>()
const edit = (data: ClinicEntity) => {
    record.value = data
    mode.value = 'edit'
    open.value = true
}
const create = () => {
    open.value = true
    mode.value = 'create'
}
const onChange = (query: IQuery) => {
    setQuery(query)
    getAllClinic()
}
onMounted(async () => {
    await getAllClinic()
})
</script>

<style scoped></style>