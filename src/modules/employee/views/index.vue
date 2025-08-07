<template>
    <div>
        <base-crud title="employee" :columns="columnEmployee" :data="employees.data" :pagination="employees.pagination"
            :loading="loadingEmployee" :scroll="{ x: 2000, y: 290 }" @on-change="onChange($event)"
            @on-edit="edit($event)" @on-add="create" @on-hard-delete="hardDeleteEmployee($event)"
            @on-soft-delete="softDeleteEmployee($event)" @on-restore="restoreEmployee($event)">
            <template #default="{ column, record }">
                <template v-if="column.key === 'gender'">
                    {{ record.gender === 'male' ? $t('male') : $t('female') }}
                </template>
            </template>
        </base-crud>
        <ModalEmployee :open="open" @update:open="open = $event" :data="record" :mode="mode"></ModalEmployee>

    </div>
</template>

<script setup lang="ts">
import BaseCrud from '@/shared/components/BaseCrud/index.vue';
import ModalEmployee from '../components/ModalEmployee.vue';
import { useEmployee } from '../composables/useEmployee';
import { onMounted, ref } from 'vue';
import { columnEmployee } from '../interface';
import type { IQuery } from '@/shared/interface/query.interface';
import type { EmployeeEntity } from '../entity';
const open = ref(false)
const record = ref<EmployeeEntity>()
const mode = ref<'create' | 'edit'>('create')

const { getAllEmployee, employees, loadingEmployee, setQueryEmployee, hardDeleteEmployee, softDeleteEmployee, restoreEmployee } = useEmployee();

const onChange = (query: IQuery) => {
    setQueryEmployee(query)
    getAllEmployee()
}
const edit = (data: EmployeeEntity) => {
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
    await getAllEmployee()
})
</script>

<style scoped></style>