<template>
    <div>
        <BaseCrud title="user" :columns="columnsUser" :data="users.data" :pagination="users.pagination"
            :loading="loadingUser" :scroll="{ x: 1500, y: 290 }" @on-change="onChange($event)"
            @on-restore="restoreUser($event)" @on-soft-delete="softDeleteUser($event)"
            @on-hard-delete="hardDeleteUser($event)" @on-add="create" @on-edit="edit($event)">
        </BaseCrud>
        <UserModal :open="open" :mode="mode" @update:open="open = $event" :data="record"></UserModal>
    </div>
</template>

<script setup lang="ts">
import UserModal from '../components/UserModal.vue';
import BaseCrud from '@/shared/components/BaseCrud/index.vue';
import { useUser } from '../composables/useUser';
import { onMounted, ref } from 'vue';
import { columnsUser } from '../interface';
import type { IQuery } from '@/shared/interface/query.interface';
import type { UserEntity } from '../entity';
const { getAllUser, users, loadingUser, setQueryUser, softDeleteUser, hardDeleteUser, restoreUser } = useUser();
const mode = ref<'create' | 'edit'>('create')
const open = ref(false)
const record = ref<UserEntity>()
const edit = (data: UserEntity) => {
    record.value = data
    mode.value = 'edit'
    open.value = true
}
const create = () => {
    open.value = true
    mode.value = 'create'
}
onMounted(async () => {
    await getAllUser()
})
const onChange = (query: IQuery) => {
    setQueryUser(query)
    getAllUser()
}
</script>

<style scoped></style>