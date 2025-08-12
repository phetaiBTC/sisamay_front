<template>
    <a-modal v-model:open="modalOpen" title="Full Screen Modal" width="100%" wrap-class-name="full-modal" @ok="handleOk"
        @cancel="emit('update:open', false)" :footer="null">
        <div style="height: 100%; width: 100%; padding: 2px 0;">
            <a-row style="height: 100%;width: 100%;" :align="'stretch'" :gutter="[16]">
                <a-col :span="16" style="height: 100%;">
                    <div style="height: 100%; width: 100%; border-radius: 10px; overflow: hidden;">
                        <l-map style="height: 100%; width: 100%" :zoom="zoom"
                            :center="[formState.latitude, formState.longitude]" @click="onMapClick">
                            <l-tile-layer :url="url" :attribution="attribution" />
                            <l-marker :lat-lng="[formState.latitude, formState.longitude]">
                                <l-popup>นี่คือตำแหน่งของคุณ</l-popup>
                            </l-marker>
                        </l-map>
                    </div>
                </a-col>
                <a-col :span="8" style="height: 100%;">
                    <div class="shadow"
                        style="height: 100%; width: 100%; border-radius: 10px; overflow: hidden; padding: 20px; background: white;">
                        <a-form :model="formState" @finish="onFinish" layout="vertical"
                            style="display: flex;flex-direction: column;justify-content: space-between;height: 100%">
                            <h1>{{ $t('add') + ' ' + $t('clinic') }}</h1>
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <BaseFormInput v-model:modelValue="formState.name" title="name"
                                        :prefix="EnvironmentOutlined" :rules="V('name', { required: true })">
                                    </BaseFormInput>
                                </a-col>
                                <a-col :span="12">
                                    <BaseFormInputNumber v-model:modelValue="formState.latitude" title="latitude"
                                        :controls="true" :prefix="EnvironmentOutlined"
                                        @change="formState.latitude = $event">
                                    </BaseFormInputNumber>
                                </a-col>
                                <a-col :span="12">
                                    <BaseFormInputNumber v-model:modelValue="formState.longitude" title="longitude"
                                        :controls="true" :prefix="EnvironmentOutlined"
                                        @change="formState.longitude = $event">
                                    </BaseFormInputNumber>
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
                                <a-col :span="12">
                                    <BaseFormInputNumber v-model:modelValue="formState.radius" title="radius"
                                        :controls="true" :prefix="FullscreenOutlined" :addon-after="$t('m')"
                                        :rules="V('radius', { required: true })">
                                    </BaseFormInputNumber>
                                </a-col>
                                <a-col :span="12">
                                    <BaseFormInputNumber v-model:modelValue="formState.late_threshold_minutes"
                                        title="late_threshold_minutes" :controls="true" :prefix="ClockCircleOutlined"
                                        :addon-after="$t('mn')"
                                        :rules="V('late_threshold_minutes', { required: true })">
                                    </BaseFormInputNumber>
                                </a-col>
                                <a-col :span="24">
                                    <a-form-item name="late_threshold_minutes" :label="$t('work_time')">
                                        <a-time-range-picker style="width: 100%;" format="HH:mm"
                                            v-model:value="formState.time"
                                            :placeholder="[$t('start_time_work'), $t('end_time_work')]" />
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
                                    <a-button style="width: 100%;" type="primary" html-type="submit"
                                        :loading="loading">{{ $t('save')
                                        }}</a-button>
                                </a-col>
                            </a-row>
                        </a-form>
                    </div>
                </a-col>
            </a-row>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormInputNumber from '@/shared/components/BaseFormInputNumber.vue'
import { computed, ref, watch, onMounted } from 'vue'
import type { LeafletMouseEvent } from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import { ClockCircleOutlined, EnvironmentOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
import { V } from '@/shared/utils/Validate'
import dayjs from 'dayjs'
import { useClinic } from '../composables/useClinic'
import type { ClinicEntity } from '../entity/clinicEntity'
import { tI18n } from '@/shared/utils/i18n'
import { useProvince } from '@/modules/province/composables/useProvince'
import { useDistrict } from '@/modules/district/composables/useDistrict'
const { getAllProvince, provinces } = useProvince()
const { getAllDistrict, districts } = useDistrict()
const optionsProvince = ref<Array<{ value: number; label: string }>>()
const optionsDistrict = ref<Array<{ value: number; label: string }>>()
const province = ref(0)
const { addClinic, update, loading } = useClinic()
const formattedTime = computed(() => {
    if (!formState.value.time || formState.value.time.length !== 2) return ['', '']
    return formState.value.time.map(t => dayjs(t).format('HH:mm'))
})
const onFinish = async () => {
    if (props.mode == 'create') {
        await addClinic({
            name: formState.value.name,
            latitude: formState.value.latitude,
            longitude: formState.value.longitude,
            radius: formState.value.radius,
            start_time_work: formattedTime.value[0],
            end_time_work: formattedTime.value[1],
            late_threshold_minutes: formState.value.late_threshold_minutes,
            district: formState.value.district
        })
    }
    else if (props.mode == 'edit') {
        await update(props.data?.id as number, {
            name: formState.value.name,
            latitude: formState.value.latitude,
            longitude: formState.value.longitude,
            radius: formState.value.radius,
            start_time_work: formattedTime.value[0],
            end_time_work: formattedTime.value[1],
            late_threshold_minutes: formState.value.late_threshold_minutes,
            district: formState.value.district
        })
    }
    formState.value.name = ''
    formState.value.district = 0
    province.value = 0
    emit('update:open', false)
}
const zoom = ref(20)
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; OpenStreetMap contributors'

const formState = ref({
    name: '',
    latitude: 17.9757,
    longitude: 102.6331,
    radius: 50,
    time: [dayjs('08:00', 'HH:mm'), dayjs('17:00', 'HH:mm')],
    late_threshold_minutes: 15,
    district: 0
})
function onMapClick(event: LeafletMouseEvent) {
    formState.value.latitude = event.latlng.lat
    formState.value.longitude = event.latlng.lng
}
const props = defineProps<{
    open: boolean
    data?: ClinicEntity
    mode: 'create' | 'edit'
}>()

const emit = defineEmits(['update:open'])
const handleOk = () => {
    emit('update:open', false)
}

const getLocation = async () => {
    if (!navigator.geolocation) {
        return
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            formState.value.latitude = position.coords.latitude
            formState.value.longitude = position.coords.longitude
        },
        (_error) => {
        },
        {
            enableHighAccuracy: true, // ขอความแม่นยำสูง
            timeout: 10000, // 10 วินาที
            maximumAge: 0   // ไม่ใช้ค่าที่ cache ไว้
        }
    )

}
watch(
    () => props.open,
    (open) => {
        if (open && props.mode === 'edit' && props.data) {
            formState.value = {
                name: props.data.name,
                latitude: props.data.latitude,
                longitude: props.data.longitude,
                radius: props.data.radius,
                time: [
                    dayjs(props.data.start_time_work, 'HH:mm'),
                    dayjs(props.data.end_time_work, 'HH:mm')
                ],
                late_threshold_minutes: props.data.late_threshold_minutes,
                district: props.data.district_id
            }
        }
        if (open && props.mode === 'create') {
            getLocation()
        }
    },
    { immediate: true }
)
const modalOpen = computed({
    get: () => props.open,
    set: (val: boolean) => emit('update:open', val)
})
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
onMounted(async () => {
    await getAllProvince()
    getLocation()
    optionsProvince.value = [
        { label: tI18n("please_select") + " " + tI18n("province"), value: 0 },
        ...provinces.value.map((item) => ({
            label: item.name,
            value: item.id
        }))
    ];
    await onProvinceChange()
})
</script>

<style>
.full-modal .ant-modal {
    width: 100vw !important;
    max-width: 100vw !important;
    height: 100vh;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
}

.full-modal .ant-modal-content {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.full-modal .ant-modal-body {
    flex: 1;
    overflow: auto;
}
</style>
