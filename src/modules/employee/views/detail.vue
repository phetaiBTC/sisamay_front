<template>
    <div>
        {{ id }}
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = ref(route.params.id)

onMounted(async () => {

})
</script>

<style scoped></style>