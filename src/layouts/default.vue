<template>
    <a-layout style="min-height: 100vh">
        <SidebarComponent />
        <a-layout class="bgc3">
            <HeaderComponent />
            <a-layout-content style="margin: 0 16px;display: flex; padding: 16px 0;">
                <div
                    :style="{ padding: '20px', minHeight: '90%', width: '100%', background: '#fff', borderRadius: '10px' }">
                    <!-- <Transition> -->
                        <router-view></router-view>
                    <!-- </Transition> -->
                </div>
            </a-layout-content>
            <FooterComponent />
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import HeaderComponent from '@/shared/components/HeaderComponent.vue';
import SidebarComponent from '@/shared/components/Sidebar/SidebarComponent.vue';
import FooterComponent from '@/shared/components/FooterComponent.vue';
</script>
<style scoped>
.site-layout .site-layout-background {
    background: #fff;
}
/* we will explain what these classes do next! */
/* .v-enter-active,
.v-leave-active {
    transform: scale(1);
    transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    transform: scale(0.95);
} */
</style>
