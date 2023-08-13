import { User, ApiData } from '@/utils/types'
import { useAuthStore } from './'

export const useUserStore = defineStore("user-store", () => {
    const user = ref<User>({} as User)

    const init = async (): Promise<void>  => {
        const config = useRuntimeConfig()
        let apiData: ApiData = {
            method: 'GET',
            path: `${config.public.API_USER}`
        }
        const { data, error } = await useApi(apiData)
        useAuthStore().isAuth = data.value.status
        user.value = data.value.user
    }

    return {
        user,
        init
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}