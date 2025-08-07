<template>
    <div>
        <base-crud title="role" :columns="columnRole" :data="roles.data" :pagination="roles.pagination"
            :loading="loadingRole" :scroll="false" @on-change="onChange($event)" @on-edit="edit($event)"
            @on-add="create">
            <template #default="{ column, record }">
                <template v-if="column.key === 'permissions'">
                  <ContainerOutlined />  {{ record.permissions.length }}
                </template>
            </template>
        </base-crud>
        <!-- <ModalEmployee :open="open" @update:open="open = $event" :data="record" :mode="mode"></ModalEmployee> -->

    </div>
</template>

<script setup lang="ts">
import BaseCrud from '@/shared/components/BaseCrud/index.vue';
// import ModalEmployee from '../components/ModalEmployee.vue';
import { useRole } from '../composables/useRole';
import { onMounted, ref } from 'vue';
import { columnRole } from '../interface';
import type { IQuery } from '@/shared/interface/query.interface';
import type { RoleEntity } from '../entity';
import { ContainerOutlined } from '@ant-design/icons-vue';
const open = ref(false)
const record = ref<RoleEntity>()
const mode = ref<'create' | 'edit'>('create')

const { getAllRole, roles, loadingRole, setQueryRole } = useRole();

const onChange = (query: IQuery) => {
    setQueryRole(query)
    getAllRole()
}
const edit = (data: RoleEntity) => {
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
    await getAllRole()
})
</script>

<style scoped></style>