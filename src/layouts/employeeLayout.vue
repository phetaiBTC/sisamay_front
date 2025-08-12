<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="1">
                    <user-outlined />
                    <span class="nav-text">nav 1</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <video-camera-outlined />
                    <span class="nav-text">nav 2</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <upload-outlined />
                    <span class="nav-text">nav 3</span>
                </a-menu-item>
                <a-menu-item key="4">
                    <user-outlined />
                    <span class="nav-text">nav 4</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
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
    </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue';
import HeaderComponent from '@/shared/components/HeaderComponent.vue';
import FooterComponent from '@/shared/components/FooterComponent.vue';
const onCollapse = (collapsed: boolean, type: string) => {
    console.log(collapsed, type);
};

const onBreakpoint = (broken: boolean) => {
    console.log(broken);
};

const selectedKeys = ref<string[]>(['4']);
</script>
<style scoped>
#components-layout-demo-responsive .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}

.site-layout-sub-header-background {
    background: #fff;
}

.site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
    background: #141414;
}
</style>
