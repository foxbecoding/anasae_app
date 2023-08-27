import { useUserStore, useAuthStore } from '@/store'

export const useProfile = () => {
    const userStore = useUserStore()
    const authStore = useAuthStore()

    const Initials = computed((): string => {
        if (!authStore.isAuth) return ''
        if(userStore.user.first_name
        && userStore.user.last_name){
            const first_initial = userStore.user.first_name.charAt(0).toUpperCase()
            const last_initial = userStore.user.last_name.charAt(0).toUpperCase()
            return first_initial+last_initial
        }else { return '' }
       
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