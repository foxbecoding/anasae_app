import { useUserStore, useAuthStore } from '@/store'

export const useProfile = () => {
    const userStore = useUserStore()
    const authStore = useAuthStore()

    const Initials = computed((): string => {
        if (!authStore.isAuth) return ''
        return userStore.user.first_name.charAt(0).toUpperCase()+userStore.user.last_name.charAt(0).toUpperCase()
    })

    const Image = computed(() => { 
        if (!authStore.isAuth) return ''
        if (userStore.user?.image?.image) {
            const { Asset } = useMediaAssets(userStore.user?.image['image'])  
            return Asset.value
        }
        return ''
    })

    return { Initials, Image }
}