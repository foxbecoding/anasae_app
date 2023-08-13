import { useAuthStore } from '@/store/'

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useAuthStore()
    return store.isAuth ? navigateTo('/') : ''
});
  