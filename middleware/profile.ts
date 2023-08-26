import { useUserStore } from '@/store'

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUserStore()
    if(store.user.uid != to.params.uid) return navigateTo('/')  
});
  