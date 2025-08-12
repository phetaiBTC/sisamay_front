<template>
  <div class="container">
    <a-card class="card">
      <h1>{{ $t('verify_email') }}</h1>
      <a-button type="primary" :loading="loading" @click="verifyEmail" class="btn-verify">
        {{ $t('click') }}
      </a-button>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { Api } from '@/plugins/axios'
import { router } from '@/router'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const loading = ref(false)
const token = useRoute().query.token

const verifyEmail = async () => {
  loading.value = true
  try {
    await Api.get('mail/verify', {
      params: {
        token: token
      }
    })
    message.success('Email verified successfully')
    await router.push({ name: 'login' })
  } catch (error) {
    console.error('Error verifying email:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6b8dd6, #8fd3f4);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  width: 400px;
  padding: 24px 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  text-align: center;
  background-color: #ffffffcc;
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
}

h1 {
  font-weight: 700;
  margin-bottom: 24px;
  color: #1d3557;
  font-size: 28px;
}

.btn-verify {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
}
</style>
