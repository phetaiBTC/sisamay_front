<template>
    <a-row :gutter="[16, 16]">
        <a-col :span="24">
            <div style="display: flex;align-items: center;justify-content: space-between;">
                <div style="display: flex;align-items: center;">
                    <StarTwoTone style="font-size: 1.2rem;margin-right: 5px;" />
                    <h1>
                        {{ props.title }}
                    </h1>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <div>
                        <a-radio-group v-model:value="size" style="display: flex;">
                            <a-radio-button value="large">
                                <FileDoneOutlined />
                            </a-radio-button>
                            <a-radio-button value="middle">
                                <DeleteFilled style="color: red;" />
                            </a-radio-button>
                        </a-radio-group>
                    </div>
                    <a-button type="primary" ghost @click="sort = !sort">
                        <SortAscendingOutlined v-if="sort" />
                        <SortDescendingOutlined v-else />
                    </a-button>
                    <a-input-search v-model:value="search" :placeholder="$t('search')" enter-button />
                    <a-button type="primary" @click="emit('onAdd',true)">Add</a-button>
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
                        <div style="width: 100%;display: flex;justify-content: space-between;">
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
                :total="total" show-size-changer @showSizeChange="onShowSizeChange">
            </a-pagination>
        </div>
    </a-row>
    <ModalDelete :open="visibleModalDelete" @update:open="($event) => visibleModalDelete = $event" :title="props.title"
        :id="deleteId" @on-delete="emit('onDelete', $event)" />
</template>

<script setup lang="ts">
import ModalDelete from '../modal/ModalDelete.vue';
import { ClockCircleTwoTone, DeleteFilled, EditOutlined, FileDoneOutlined, SortAscendingOutlined, SortDescendingOutlined, StarTwoTone } from '@ant-design/icons-vue';
import { ref } from 'vue';
const search = ref<string>('');
const size = ref<string>('large');
const sort = ref<boolean>(true);
const deleteId = ref<number>(0);
const visibleModalDelete = ref<boolean>(false);
import type { TableColumnsType } from 'ant-design-vue';
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const current = ref(1);
const pageSizeRef = ref(10);
const total = ref(50);
const onShowSizeChange = (current: number, pageSize: number) => {
    console.log(current, pageSize);
    pageSizeRef.value = pageSize;
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
const emit = defineEmits(['onDelete','onAdd'])

</script>

<style scoped></style>