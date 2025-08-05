<template>
    <a-form-item :name="props.title" :label="$t(props.title)"
        :rules="props.rules">
        <a-input v-model:value="modelValue" :placeholder="$t(props.title)">
            <template #prefix>
                <component :is="props.prefix" class="site-form-item-icon" style="margin-right: 5px;" />
            </template>
        </a-input>
    </a-form-item>
</template>

<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import { computed, type Component } from 'vue'
const props = defineProps<{
    modelValue: string
    title: string
    prefix?: Component | null
    rules?: Rule[]
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()
const modelValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
})
</script>

<style scoped></style>