<template>
    <a-row :gutter="[16, 16]">
        <a-col :span="24">
            <div style="display: flex;align-items: center;justify-content: space-between;">
                <div style="display: flex;align-items: center;">
                    <StarTwoTone style="font-size: 1.2rem;margin-right: 5px;" />
                    <h1>
                        {{ $t(props.title) }}
                    </h1>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <div>
                        <a-radio-group v-model:value="is_active" style="display: flex;" @change="onChange">
                            <a-radio-button value="active">
                                <FileDoneOutlined />
                            </a-radio-button>
                            <a-radio-button value="inactive">
                                <DeleteFilled style="color: red;" />
                            </a-radio-button>
                        </a-radio-group>
                    </div>
                    <a-button type="primary" ghost @click="() => { sort = !sort; onChange() }">
                        <SortAscendingOutlined v-if="sort" />
                        <SortDescendingOutlined v-else />
                    </a-button>
                    <a-input-search v-model:value="search" :placeholder="$t('search')" enter-button
                        @search="onChange" />
                    <a-button type="primary" @click="emit('onAdd', true)">{{ $t('add') + ' ' + $t(props.title)
                        }}</a-button>
                </div>
            </div>
        </a-col>
        <a-col :span="24">
            <a-table :columns="props.columns" :data-source="props.data" :scroll="props.scroll" :pagination="false"
                bordered class="table_a">
                <template #bodyCell="{ column, record, index }">
                    <template v-if="column.key === 'index'">
                        {{ index + 1 }}
                    </template>
                    <template v-if="column.key === 'operation'">
                        <div style="width: 100%;display: flex;justify-content: space-between;"
                            v-if="is_active === 'active'">
                            <a-button type="primary">
                                <template #icon>
                                    <EditOutlined />
                                </template>
                                {{ $t('edit') }}
                            </a-button>
                            <a-button type="primary" danger ghost
                                @Click="() => { visibleModalDelete = true; deleteId = record.id }">
                                <template #icon>
                                    <delete-filled style="color: red;" />
                                </template>
                            </a-button>
                        </div>
                        <div style="width: 100%;display: flex;justify-content: space-between;"
                            v-if="is_active === 'inactive'">
                            <a-button type="primary">
                                <template #icon>
                                    <ReloadOutlined />
                                </template>
                                {{ $t('restore') }}
                            </a-button>
                            <a-button type="primary" danger ghost @click="showDeleteConfirm(record.id)">
                                <template #icon>
                                    <delete-filled style="color: red;" />
                                </template>
                            </a-button>
                        </div>
                    </template>
                    <slot :column="column" :record="record" :index="index"></slot>
                    <template v-if="column.key === 'createdAt'">
                        <div style="display: flex;align-items: center;">
                            <ClockCircleTwoTone style="font-size: 1.2rem;margin-right: 5px;" />
                            {{ record.createdAt }}
                        </div>
                    </template>
                    <template v-if="column.key === 'updatedAt'">
                        <div style="display: flex;align-items: center;">
                            <ClockCircleTwoTone style="font-size: 1.2rem;margin-right: 5px;" />
                            {{ record.updatedAt }}
                        </div>
                    </template>
                </template>
            </a-table>
        </a-col>
        <div style="display: flex;justify-content: flex-end; width: 100%;">
            <a-pagination v-model:current="current" v-model:page-size="pageSizeRef" :page-size-options="pageSizeOptions"
                :total="total" show-size-changer @showSizeChange="onChange">
            </a-pagination>
        </div>
    </a-row>
    <ModalDelete :open="visibleModalDelete" @update:open="($event) => visibleModalDelete = $event" :title="props.title"
        :id="deleteId" @on-hard-delte="onHardDelete($event)" @on-soft-delete="onSoftDelete($event)" />
</template>

<script setup lang="ts">
import ModalDelete from '../modal/ModalDelete.vue';
import { ClockCircleTwoTone, DeleteFilled, EditOutlined, ExclamationCircleOutlined, FileDoneOutlined, ReloadOutlined, SortAscendingOutlined, SortDescendingOutlined, StarTwoTone } from '@ant-design/icons-vue';
import { createVNode, ref } from 'vue';
const search = ref<string>('');
const is_active = ref<string>('active');
const sort = ref<boolean>(true);
const deleteId = ref<number>(0);
const visibleModalDelete = ref<boolean>(false);
import { Modal, type TableColumnsType } from 'ant-design-vue';
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const current = ref(1);
const pageSizeRef = ref(10);
const total = ref(50);
const onChange = () => {
    emit('onChange', {
        page: current.value,
        limit: pageSizeRef.value,
        search: search.value,
        is_active: is_active.value,
        sort: sort.value ? 'ASC' : 'DESC'
    })
};
const props = withDefaults(defineProps<{
    title: string
    columns: TableColumnsType
    data: any[]
    scroll?: {
        x: number
        y: number
    } | boolean
}>(), {
    scroll: () => (false)
})
const emit = defineEmits(['onAdd', 'onChange', 'onHardDelete', 'onSoftDelete'])
const onHardDelete = (id: number) => {
    emit('onHardDelete', id)
}
const onSoftDelete = (id: number) => {
    emit('onSoftDelete', id)
}
const showDeleteConfirm = (id: number) => {
    Modal.confirm({
        title: 'Are you sure delete this task?',
        icon: createVNode(ExclamationCircleOutlined),
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            onHardDelete(id)
        },
    });
};
</script>

<style scoped></style>