<template>
    <a-modal v-model:open="props.open" title="Full Screen Modal" width="100%" wrap-class-name="full-modal"
        @ok="handleOk" @cancel="emit('update:open', false)">
        <div style="height: 100%; width: 100%; padding: 2px 0;">
            <a-row style="height: 100%;width: 100%;" :align="'stretch'" :gutter="[16, 16]">
                <a-col :span="16" style="height: 100%;">
                    <div style="height: 100%; width: 100%; border-radius: 10px; overflow: hidden;">
                        <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
                            <l-tile-layer :url="url" :attribution="attribution" />
                            <l-marker :lat-lng="center">
                                <l-popup>นี่คือตำแหน่งของคุณ</l-popup>
                            </l-marker>
                        </l-map>
                    </div>
                </a-col>
                <a-col :span="8" style="height: 100%;">
                    <div class="shadow" style="height: 100%; width: 100%; border-radius: 10px; overflow: hidden;">
                    </div>
                </a-col>
            </a-row>
        </div>
    </a-modal>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import type { PointTuple } from 'leaflet'
import {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
} from '@vue-leaflet/vue-leaflet'

const zoom = ref(13)
const center = ref<PointTuple>([18.9757, 102.6331])
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; OpenStreetMap contributors'
const props = defineProps<{
    open: boolean
}>()
const emit = defineEmits(['update:open'])
const handleOk = () => {
    emit('update:open', false)
}
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
