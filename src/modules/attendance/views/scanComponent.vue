<script setup lang="ts">
import { ScanOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { useAttendance } from '../composables/useAttendance'
const { addAttendance } = useAttendance()
const latitude = ref<number | null>(null)
const longitude = ref<number | null>(null)
const accuracy = ref<number | null>(null)
const errorMessage = ref<string | null>(null)

const getLocation = async () => {
    if (!navigator.geolocation) {
        errorMessage.value = 'เบราว์เซอร์นี้ไม่รองรับการดึงพิกัด'
        return
    }
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            latitude.value = position.coords.latitude
            longitude.value = position.coords.longitude
            accuracy.value = position.coords.accuracy
            await addAttendance({
                latitude: latitude.value,
                longitude: longitude.value,
                accuracy: accuracy.value
            })
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage.value = 'คุณปฏิเสธการให้สิทธิ์'
                    break
                case error.POSITION_UNAVAILABLE:
                    errorMessage.value = 'ไม่สามารถระบุตำแหน่งได้'
                    break
                case error.TIMEOUT:
                    errorMessage.value = 'การดึงพิกัดใช้เวลานานเกินไป'
                    break
                default:
                    errorMessage.value = 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ'
            }
        },
        {
            enableHighAccuracy: true, // ขอความแม่นยำสูง
            timeout: 10000, // 10 วินาที
            maximumAge: 0   // ไม่ใช้ค่าที่ cache ไว้
        }
    )

}
</script>

<template>
    <div class="p-4">
        <div style="width: 100%; text-align: center;">
            <a-button type="primary" size="large" @click="getLocation">
                <ScanOutlined />
                {{ $t('scan') }}
            </a-button>
        </div>
        <div v-if="latitude && longitude" class="mt-4">
            📍 Latitude: {{ latitude }} <br />
            📍 Longitude: {{ longitude }} <br />
            🎯 ความแม่นยำ: ±{{ accuracy }} เมตร
        </div>


        <div v-if="errorMessage" class="mt-4 text-red-500">
            {{ errorMessage }}
        </div>
    </div>
</template>
