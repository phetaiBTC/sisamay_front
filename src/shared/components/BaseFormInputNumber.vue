<template>
    <a-form-item :name="props.title" :label="$t(props.title)" :rules="props.rules">
        <a-input-number v-model:value="modelValue" :placeholder="$t(props.title)" :formatter="currencyFormatter"
            style="width: 100%; text-align: right !important;" :addon-after="props.addonAfter"
            :class="!controls ? 'right-align-input' : ''" :controls="controls || false" @change="emit('change', $event)">
            <template #prefix>
                <component :is="props.prefix" class="site-form-item-icon" style="margin-right: 5px;" />
            </template>
        </a-input-number>
    </a-form-item>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Rule } from 'ant-design-vue/es/form'
const props = defineProps<{
    modelValue: number
    title: string
    prefix?: Component | null
    controls?: boolean
    addonAfter?: string
    rules?: Rule[]
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
    (e: 'change', value: number): void
}>()

const modelValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
})

const { n } = useI18n()
const currencyFormatter = (value: number | string) => {
    const number = Number(value)
    return isNaN(number) ? '' : n(number, 'decimal')
}

</script>

<style scoped lang="css">
.right-align-input :deep(.ant-input-number-input) {
    text-align: right;
    padding-right: 5px;
}
</style>
