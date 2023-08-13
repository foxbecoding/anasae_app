import { User } from '@/utils/types'

export const useUserStore = defineStore("user-store", () => {
    const user = ref<User>({} as User)

    return {
        user
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}