<template>
    <a-layout-header style="background: #fff;padding: 0">
        <div
            style="display: flex;width: 100%; height: 100%;justify-content: space-between;align-items: center; padding: 0 20px;">
            <div class="flex items-center gap-2">
                <span style="font-size: 1rem;">
                    <UserOutlined style="margin-right: 10px;" /> Admin
                </span>
            </div>
            <div style="display: flex;align-items: center; gap: 16px;">
                <a-select ref="select" @change="setLanguage(language)" v-model:value="language">
                    <a-select-option value="la">
                        <img src="/src/assets/images/laos.png" style="height: 1rem;margin-top: -4px !important;">
                    </a-select-option>
                    <a-select-option value="en">
                        <img src="/src/assets/images/english.png" style="height: 1rem;margin-top: -4px !important;">
                    </a-select-option>
                    <a-select-option value="vn">
                        <img src="/src/assets/images/vietnam.png" style="height: 1rem;margin-top: -4px !important;">
                    </a-select-option>
                </a-select>
                <a-button type="primary" @click="logout()" :loading="loading">
                    <LogoutOutlined/>{{ $t('logout') }}
                </a-button>
            </div>
        </div>
    </a-layout-header>
</template>

<script setup lang="ts">
import { router } from '@/router';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
const loading = ref(false)
const language = ref(localStorage.getItem('app-locale') || 'la')

const { locale } = useI18n()

const setLanguage = (lang: string) => {
    locale.value = lang
    localStorage.setItem('app-locale', lang)
}

const logout = async () => {
    loading.value = true
    localStorage.removeItem('token')
    loading.value = false
    await router.push({ name: 'login' })
}
</script>

<style scoped></style>