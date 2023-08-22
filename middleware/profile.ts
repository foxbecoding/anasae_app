import { useUserStore } from '@/store'

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUserStore()
    return store.user.uid != to.params.uid ? navigateTo('/') : ''
});
  