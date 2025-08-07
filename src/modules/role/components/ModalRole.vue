<template>
    <a-modal v-model:open="modalOpen" :title="$t(props.mode) + ' ' + $t('role')" @ok="onFinish"
        @cancel="emit('update:open', false)" centered>
        <div style="height: 100%; width: 100%; padding: 2px 0;">
            <a-form :model="formState" @finish="onFinish" layout="vertical" :disabled="loadingRole">
                <a-row style="height: 100%;width: 100%;" :align="'stretch'" :gutter="[16]">
                    <a-col :span="12" style="height: 100%;">
                        <BaseFormInput v-model:modelValue="formState.name" title="name" :prefix="FormOutlined"
                            :rules="V('name', { required: true })">
                        </BaseFormInput>
                    </a-col>
                    <a-col :span="12" style="height: 100%;">
                        <BaseFormInput v-model:modelValue="formState.display_name" title="display_name"
                            :prefix="FormOutlined" :rules="V('display_name', { required: true })">
                        </BaseFormInput>
                    </a-col>
                    <a-col :span="24">
                        <div style="height: 300px;overflow: scroll;">
                            <a-collapse>
                                <a-collapse-panel v-for="(perms, groupName) in groupedPermissions" :key="groupName"
                                    :header="groupName.toUpperCase()">
                                    <a-checkbox-group v-model:value="selectedPermissions[groupName]"
                                        :options="perms.map(perm => ({ label: perm.display_name, value: perm.id }))" />
                                    <template #extra>
                                        <a-button type="primary" @click="selectAll(groupName, perms)">
                                            <SettingOutlined /> Select All
                                        </a-button>
                                    </template>
                                </a-collapse-panel>
                            </a-collapse>
                        </div>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import { computed, ref, watch, onMounted } from 'vue'
import { V } from '@/shared/utils/Validate'
import { useRole } from '../composables/useRole'
import { usePermission } from '@/modules/permission/composables/usePermission'
import type { RoleEntity } from '../entity'
import type { IRole } from '../interface'
import { FormOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { PermissionEntity } from '@/modules/permission/entity'

const { addRole, updateRole, loadingRole } = useRole()
const { getAllPermission, permissions } = usePermission()
const groupedPermissions = computed(() => {
    const groups: Record<string, PermissionEntity[]> = {}

    // กำหนดกลุ่มที่รู้จัก
    const knownGroups = ['user', 'role', 'employee', 'clinic', 'attendance', 'education', 'permission']

    for (const perm of permissions.value) {
        // หาชื่อ group จาก keyword ที่อยู่ในชื่อ permission
        const groupKey = knownGroups.find(keyword => perm.name.toLowerCase().includes(keyword)) || 'others'

        if (!groups[groupKey]) {
            groups[groupKey] = []
        }

        groups[groupKey].push(perm)
    }

    return groups
})

const selectAll = (groupName: string, perms: PermissionEntity[]) => {
    selectedPermissions.value[groupName] = perms.map(perm => perm.id)
}
const selectedPermissions = ref<Record<string, number[]>>({})
const onFinish = async () => {
    // รวม id ทั้งหมดจาก selectedPermissions ก่อน submit
    formState.value.permissions = Object.values(selectedPermissions.value).flat()

    if (props.mode == 'create') {
        await addRole(formState.value)
    }
    else if (props.mode == 'edit') {
        await updateRole(props.data?.id as number, formState.value)
    }

    // Reset form
    formState.value.name = ''
    formState.value.display_name = ''
    formState.value.permissions = []
    selectedPermissions.value = {}

    emit('update:open', false)
}



const formState = ref<IRole>({
    name: '',
    display_name: '',
    permissions: [],
})
const props = defineProps<{
    open: boolean
    data?: RoleEntity
    mode: 'create' | 'edit'
}>()

const emit = defineEmits(['update:open'])

watch(
    () => props.open,
    (open) => {
        if (open && props.mode === 'edit' && props.data) {
            // ตั้งค่า form
            formState.value = {
                name: props.data.name,
                display_name: props.data.display_name,
                permissions: props.data.permissions.map((item) => item.id)
            }

            // แยก permissions เป็น group แล้วตั้ง selectedPermissions
            const grouped = groupedPermissions.value
            const selected: Record<string, number[]> = {}

            for (const [group, perms] of Object.entries(grouped)) {
                const selectedIds = perms
                    .filter(perm => formState.value.permissions.includes(perm.id))
                    .map(perm => perm.id)

                if (selectedIds.length) {
                    selected[group] = selectedIds
                }
            }

            selectedPermissions.value = selected
        }

        if (open && props.mode === 'create') {
            formState.value = {
                name: '',
                display_name: '',
                permissions: []
            }

            selectedPermissions.value = {} // reset
        }
    },
    { immediate: true }
)

const modalOpen = computed({
    get: () => props.open,
    set: (val: boolean) => emit('update:open', val)
})

onMounted(async () => {
    await getAllPermission()
})
</script>

<style></style>
