<template>
    <a-result status="403" title="401" sub-title="Sorry, you are not authorized to access this page.">
        <template #extra>
            <a-button type="primary" @click="$router.push({ name: 'login' })">{{ $t('login') }}</a-button>
        </template>
    </a-result>
</template>
