<template>
    <div>
        <a-modal v-model:open="modalOpen" :title="$t(props.mode) + ' ' + $t('user')" centered
            @cancel="emit('update:open', false)" :footer="null" width="400px">
            <a-form :model="formState" @finish="onFinish" layout="vertical"
                style="display: flex;flex-direction: column;justify-content: space-between;height: 100%">
                <a-row :gutter="16">
                    <a-col :span="24">
                        <BaseFormInput v-model:modelValue="formState.username" title="username" :prefix="UserOutlined"
                            :rules="V('username', { required: true })">
                        </BaseFormInput>
                    </a-col>
                    <a-col :span="24">
                        <BaseFormInput v-model:modelValue="formState.email" title="email" :prefix="MailOutlined"
                            :rules="V('email', { required: true, email: true })">
                        </BaseFormInput>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item :label="$t('password')" name="clinic" :rules="V('password', { required: true })">
                            <a-input-password v-model:value="formState.password" :placeholder="$t('password')">
                                <template #prefix>
                                    <LockOutlined class="site-form-item-icon" />
                                </template>
                            </a-input-password>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Clinic" name="clinic" :rules="V('clinic', { required: true })">
                            <a-select v-model:value="formState.clinic" :options="options">
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="[16, 16]">
                    <a-col :span="12">
                        <a-button style="width: 100%;" type="primary" danger ghost
                            @click="emit('update:open', false)">{{ $t('cancel')
                            }}</a-button>
                    </a-col>
                    <a-col :span="12">
                        <a-button style="width: 100%;" type="primary" html-type="submit">{{ $t('save')
                            }}</a-button>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { UserEntity } from '../entity';
import BaseFormInput from '@/shared/components/BaseFormInput.vue';
import type { IUser } from '../interface';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons-vue';
import { V } from '@/shared/utils/Validate';
import { useUser } from '../composables/useUser';
import { useClinic } from '@/modules/clinic/composables/useClinic';
import { tI18n } from '@/shared/utils/i18n';
const { getAllClinic, clinics, setQuery } = useClinic()
const { addUser, updateUser } = useUser()
const options = ref<Array<{ value: number; label: string }>>()
const onFinish = async () => {
    if (props.mode == 'create') {
        await addUser({
            username: formState.value.username,
            email: formState.value.email,
            password: formState.value.password,
            clinic: formState.value.clinic
        })
    }
    else if (props.mode == 'edit') {
        await updateUser(props.data?.id as number, {
            username: formState.value.username,
            email: formState.value.email,
            password: formState.value.password,
            clinic: formState.value.clinic
        })
    }
    formState.value.username = ''
    formState.value.email = ''
    formState.value.password = ''
    formState.value.clinic = 0
    emit('update:open', false)
}
const formState = ref<IUser>({
    username: '',
    email: '',
    password: '',
    clinic: 0
})
const props = defineProps<{
    open: boolean
    data?: UserEntity
    mode: 'create' | 'edit'
}>()
const emit = defineEmits(['update:open'])
onMounted(async () => {
    setQuery({
        type: 'all'
    })
    await getAllClinic()
    options.value = [
        { label: tI18n("please_select") + " " + tI18n("clinic"), value: 0 },
        ...clinics.value.data.map((item) => ({
            label: item.name,
            value: item.id
        }))
    ];
})
const modalOpen = computed({
    get: () => props.open,
    set: (val: boolean) => emit('update:open', val)
})
watch(
    () => props.open,
    (open) => {
        if (open && props.mode === 'edit' && props.data) {
            formState.value = {
                username: props.data.username,
                email: props.data.email,
                password: '',
                clinic: 0
            }
        }
        if (open && props.mode === 'create') {
            formState.value = {
                username: '',
                email: '',
                password: '',
                clinic: 0
            }
        }
    },
    { immediate: true }
)
</script>

<style scoped></style>