<template>
    <a-modal v-model:open="props.open" @ok="handleOk" @cancel="emit('update:open', false)"
        :okButtonProps="{ type: 'primary', danger: true, ghost: false }" :okText="$t('delete')"
        :cancelText="$t('cancel')" :cancelButtonProps="{ type: 'primary', ghost: true }">
        <template #title>
            <div style="display: flex; align-items: center;">
                <DeleteTwoTone two-tone-color="red" style="font-size: 1.2rem;margin-right: 5px;" />
                <h1>{{ $t('delete') + ' ' + $t(props.title) }}</h1>
            </div>
        </template>
        <div style="margin-top: 16px;">
            <a-alert :message="$t('warning')" type="warning" show-icon style="margin-bottom: 10px;" />
            <a-radio-group v-model:value="typeDelete" size="large"
                style="width: 100%;display: flex;justify-content: space-between;gap: 10px;">
                <a-radio-button value="soft" style="height: auto;width: 50%"
                    :class="{ 'soft-selected': typeDelete === 'soft' }">
                    <div style="width: 100%;height: 100%;display: flex;flex-direction: column;">
                        <h1>
                            <RetweetOutlined style="margin-right: 5px;" />{{ $t('soft_delete') }}
                        </h1>
                        <h2 style="font-size: 1rem;margin: 0 !important;">
                            <CheckCircleTwoTone /> {{ $t('can_recover') }}
                        </h2>
                        <h2 style="font-size: 1rem;">
                            <CheckCircleTwoTone /> {{ $t('data_preserve') }}
                        </h2>
                    </div>
                </a-radio-button>
                <a-radio-button value="hard" style="height: auto;width: 50%;border-left: 1px solid red;"
                    :class="{ 'hard-selected': typeDelete === 'hard' }">
                    <h1>
                        <DeleteTwoTone two-tone-color="red" style="margin-right: 5px;" /> {{ $t('hard_delete') }}
                    </h1>
                    <h2 style="font-size: 1rem;margin: 0 !important;">
                        <CloseCircleTwoTone :two-tone-color="'#ff4d4f'" /> {{ $t('can_not_recover') }}
                    </h2>
                    <h2 style="font-size: 1rem;">
                        <CloseCircleTwoTone :two-tone-color="'#ff4d4f'" /> {{ $t('data_lost_preserve') }}
                    </h2>
                </a-radio-button>
            </a-radio-group>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { CheckCircleTwoTone, CloseCircleTwoTone, DeleteTwoTone, RetweetOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
    open: boolean
    title: string
    id: number
}>()
const typeDelete = ref<string>('soft');
const emit = defineEmits(['update:open', 'onHardDelte', 'onSoftDelete'])

const deleteType = ref<'soft' | 'hard'>('soft')

watch(() => props.open, (newVal) => {
    if (newVal) {
        deleteType.value = 'soft'
    }
})

const handleOk = () => {
    if (typeDelete.value === 'soft') {
        emit('onSoftDelete', props.id)
    } else {
        emit('onHardDelte', props.id)
    }
    emit('update:open', false)
}
</script>

<style scoped>
.hard-selected {
    border-color: red !important;
    color: red !important;
    border-left: 1px solid red !important;
    background-color: #ffeaea !important;
    overflow: hidden;
}

.soft-selected {
    border-color: #1890ff !important;
    color: #1890ff !important;
    background-color: #e6f7ff !important;
    border-right: 1px solid #1890ff !important;
}
</style>