<template>
    <a-modal v-model:open="props.open" @ok="handleOk" @cancel="emit('update:open', false)"
        :okButtonProps="{ type: 'primary', danger: true, ghost: false }" :okText="$t('delete')"
        :cancelText="$t('cancel')" :cancelButtonProps="{ type: 'primary', ghost: true }">
        <template #title>
            <div style="display: flex; align-items: center;">
                <DeleteTwoTone two-tone-color="red" style="font-size: 1.2rem;margin-right: 5px;" />
                <h1>{{ $t('delete') + " " + props.title + " id : " + props.id }}</h1>
            </div>
        </template>
        <div style="margin-top: 16px;">
            <a-alert message="Warning" type="warning" show-icon />
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { DeleteTwoTone } from '@ant-design/icons-vue'

const props = defineProps<{
    open: boolean
    title: string
    id: number
}>()

const emit = defineEmits(['update:open', 'onDelete'])

const deleteType = ref<'soft' | 'hard'>('soft')

watch(() => props.open, (newVal) => {
    if (newVal) {
        deleteType.value = 'soft'
    }
})

const handleOk = () => {
    emit('onDelete',
        props.id,
    )
    emit('update:open', false)
}
</script>

<style scoped></style>