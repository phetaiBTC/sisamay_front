<template>
    <div>
        <a-modal v-model:open="modalOpen" :title="$t(props.mode) + ' ' + $t('employee')" centered
            @cancel="emit('update:open', false)" :footer="null" width="400px">
            <a-form :model="formState" @finish="onFinish" layout="vertical"
                style="display: flex;flex-direction: column;justify-content: space-between;height: 100%"
                >
                <a-row :gutter="16">
                    <a-col :span="12">
                        <BaseFormInput v-model:modelValue="formState.name" title="name" :prefix="UserOutlined"
                            :rules="V('name', { required: true })">
                        </BaseFormInput>
                    </a-col>
                    <a-col :span="12">
                        <BaseFormInput v-model:modelValue="formState.surname" title="surname" :prefix="UserOutlined"
                            :rules="V('surname', { required: true })">
                        </BaseFormInput>
                    </a-col>
                    <a-col :span="12">
                        <BaseFormInput v-model:modelValue="formState.email" title="email" :prefix="MailOutlined"
                            :rules="V('email', { required: true, email: true })">
                        </BaseFormInput>
                    </a-col>
                    <a-col :span="12" v-if="props.mode == 'create'">
                        <a-form-item :label="$t('password')" name="password"
                            :rules="V('password', { required: true, password: true })">
                            <a-input-password v-model:value="formState.password" :placeholder="$t('password')">
                                <template #prefix>
                                    <LockOutlined class="site-form-item-icon" />
                                </template>
                            </a-input-password>
                        </a-form-item>
                    </a-col>


                    <a-col :span="12">
                        <a-form-item :label="$t('clinic')" name="clinic" :rules="V('clinic', { required: true })">
                            <a-select v-model:value="formState.clinic" :options="options">
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item :label="$t('gender')" name="gender" :rules="V('gender', { required: true })">
                            <a-radio-group v-model:value="formState.gender" button-style="solid" style="width: 100%;">
                                <a-radio-button value="male">{{ $t('male') }}</a-radio-button>
                                <a-radio-button value="female">{{ $t('female') }}</a-radio-button>
                            </a-radio-group>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item :label="$t('province')" name="province">
                            <a-select :options="optionsProvince" v-model:value="province"
                                @change="onProvinceChange(province)">
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item :label="$t('district')" name="district">
                            <a-select v-model:value="formState.district" :options="optionsDistrict">
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="props.mode == 'edit' ? 12 : 24">
                        <a-form-item :label="$t('birth_date')" name="birth_date"
                            :rules="V('birth_date', { required: true })">
                            <a-date-picker v-model:value="formState.birth_date" style="width: 100%;" />
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
                        <a-button style="width: 100%;" type="primary" html-type="submit" :loading="loadingEmployee">{{
                            $t('save')
                            }}</a-button>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { EmployeeEntity } from '../entity';
import BaseFormInput from '@/shared/components/BaseFormInput.vue';
import type { IEmployee } from '../interface';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons-vue';
import { V } from '@/shared/utils/Validate';
import { useEmployee } from '../composables/useEmployee';
import { useClinic } from '@/modules/clinic/composables/useClinic';
import { tI18n } from '@/shared/utils/i18n';
import { useProvince } from '@/modules/province/composables/useProvince'
import { useDistrict } from '@/modules/district/composables/useDistrict'
import dayjs from 'dayjs';

const { getAllProvince, provinces } = useProvince()
const { getAllDistrict, districts } = useDistrict()
const province = ref(0)
const optionsProvince = ref<Array<{ value: number; label: string }>>()
const optionsDistrict = ref<Array<{ value: number; label: string }>>()
const { getAllClinic, clinics, setQuery } = useClinic()
const { addEmployee, updateEmployee, loadingEmployee } = useEmployee()
const options = ref<Array<{ value: number; label: string }>>()
const onFinish = async () => {
    if (props.mode == 'create') {
        await addEmployee({
            name: formState.value.name,
            birth_date: formState.value.birth_date,
            surname: formState.value.surname,
            gender: formState.value.gender,
            district: formState.value.district,
            email: formState.value.email,
            password: formState.value.password,
            clinic: formState.value.clinic
        })
    }
    else if (props.mode == 'edit') {
        await updateEmployee(props.data?.id as number, {
            name: formState.value.name,
            birth_date: formState.value.birth_date,
            surname: formState.value.surname,
            gender: formState.value.gender,
            district: formState.value.district,
            email: formState.value.email,
            password: formState.value.password,
            clinic: formState.value.clinic
        })
    }
    formState.value.name = ''
    formState.value.email = ''
    formState.value.password = ''
    formState.value.clinic = 0
    formState.value.district = 0
    formState.value.surname = ''
    formState.value.gender = 'male'
    formState.value.birth_date = dayjs('2000-01-01')
    emit('update:open', false)
}
const formState = ref<IEmployee>({
    name: '',
    email: '',
    surname: '',
    password: '',
    birth_date: dayjs('2000-01-01'),
    gender: 'male',
    district: 0,
    clinic: 0
})
const props = defineProps<{
    open: boolean
    data?: EmployeeEntity
    mode: 'create' | 'edit'
}>()
const onProvinceChange = async (value?: number) => {
    await getAllDistrict(value)
    optionsDistrict.value = [
        { label: tI18n("please_select") + " " + tI18n("district"), value: 0 },
        ...districts.value.map((item) => ({
            label: item.name,
            value: item.id
        }))
    ];
}
const emit = defineEmits(['update:open'])
onMounted(async () => {
    await getAllProvince()

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
    optionsProvince.value = [
        { label: tI18n("please_select") + " " + tI18n("province"), value: 0 },
        ...provinces.value.map((item) => ({
            label: item.name,
            value: item.id
        }))
    ];
    await onProvinceChange()
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
                name: props.data.name,
                email: props.data.email,
                surname: props.data.surname,
                password: '',
                birth_date: dayjs(props.data.birth_date),
                gender: props.data.gender,
                district: props.data.district_id,
                clinic: props.data.clinic_id
            }
            province.value = props.data.province_id
        }
        if (open && props.mode === 'create') {
            formState.value = {
                name: '',
                email: '',
                surname: '',
                password: '',
                birth_date: dayjs('2000-01-01'),
                gender: 'male',
                district: 0,
                clinic: 0
            }
        }
    },
    { immediate: true }
)
</script>

<style scoped></style>