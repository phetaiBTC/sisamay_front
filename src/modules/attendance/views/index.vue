<template>
    <div>
        <base-crud title="employee" :columns="columnAttendance" :data="attendances.data"
            :pagination="attendances.pagination" :loading="loadingAttendance" :scroll="{ x: 2000, y: 290 }"
            @on-change="onChange($event)" @on-edit="edit($event)" @on-add="create"
            @on-hard-delete="hardDeleteAttendance($event)" @on-soft-delete="softDeleteAttendance($event)"
            @on-restore="restoreAttendance($event)">
       
        </base-crud>
        <ModalEmployee :open="open" @update:open="open = $event" :data="record" :mode="mode"></ModalEmployee>

    </div>
</template>

<script setup lang="ts">
import BaseCrud from '@/shared/components/BaseCrud/index.vue';
// import ModalEmployee from '../components/ModalEmployee.vue';
import { useAttendance } from '../composables/useAttendance';
import { onMounted, ref } from 'vue';
import { columnAttendance } from '../interface';
import type { IQuery } from '@/shared/interface/query.interface';
import type { AttendanceEntity } from '../entity';


const open = ref(false)
const record = ref<AttendanceEntity>()
const mode = ref<'create' | 'edit'>('create')

const { getAllAttendance, attendances, loadingAttendance, setQueryEmployee, hardDeleteAttendance, softDeleteAttendance, restoreAttendance } = useAttendance();

const onChange = (query: IQuery) => {
    setQueryEmployee(query)
    getAllAttendance()
}
const edit = (data: AttendanceEntity) => {
    record.value = data
    mode.value = 'edit'
    open.value = true
    console.log(record.value)
}
const create = () => {
    open.value = true
    mode.value = 'create'
}
onMounted(async () => {
    await getAllAttendance()
})
</script>

<style scoped></style>