<template>
    <div style="width: 100vw;height: 100vh;display: flex;align-items: center;justify-content: center;">
        <div
            style="border-radius: 10px;overflow: hidden; padding: 0 30px;display: flex;flex-direction: column;justify-content: center;align-items: center;box-shadow: 0 0 10px rgba(0, 0, 0,0.5);">
            <DotLottieVue style="height: 200px; width: 200px" autoplay loop src="/src/assets/images/dog.lottie" />
            <a-form :model="formState" name="normal_login" class="login-form" @finish="login(formState.email, formState.password)"
                @finishFailed="onFinishFailed">
                <a-form-item name="email" :rules="[{ required: true, message: 'Please input your email!'}, { type: 'email', message: 'The input is not valid E-mail!' }]">
                    <a-input v-model:value="formState.email" placeholder="Email">
                        <template #prefix>
                            <MailOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
                    <a-input-password v-model:value="formState.password" placeholder="Password">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item>
                    <a-form-item name="remember" no-style>
                        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                    </a-form-item>
                    <a class="login-form-forgot" href="">Forgot password</a>
                </a-form-item>

                <a-form-item>
                    <a-button :loading="loading" :disabled="disabled" type="primary" html-type="submit" class="login-form-button"
                        style="width: 100%;">
                        Log in
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { MailOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useAuth } from '../composables/useAuth';
const { login,loading } = useAuth();
interface FormState {
    email: string;
    password: string;
    remember: boolean;
}
const formState = reactive<FormState>({
    email: 'super_admin@gmail.com',
    password: 'super@1234',
    remember: true,
});

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return !(formState.email && formState.password);
});
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
    float: right;
}

#components-form-demo-normal-login .login-form-button {
    width: 100%;
}
</style>
